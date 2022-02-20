import express from 'express';

import cityList from './../properties/constants';
import service from './../service/cityService';

let cityController = {
  /**
   * @Api_Name : cityList (GET API)
   * @usage : fetch city list with in a given points
   * @Query_Params : lat, lng
   * @Response : Array of Cities with id and name
   */
   getCityList: (req: express.Request, res: express.Response)=> {
    try{
      let lat = req.query.lat;
      let lng = req.query.lng;
 
      if(!lat || !lng){
        return res.status(400).json({
          code: "BadRequestError",
          message: "lat/lng required"
        })
      }
      let responseArr = [];
      for(let city of cityList){
        let distance = service.calculateDistanceBetweenTwoPoints(Number(lat), Number(lng), city.coord.lat, city.coord.lon);
        if(distance <= 10){
          responseArr.push({id: city.id, name: city.name});
        }
      }
      if(!responseArr.length){
        return res.status(404).json({
          code: "NotFoundError",
          message: "No city found with in given range"
        })
      }
      res.json(responseArr);
    }catch(err){
      res.status(500).json({
        code: "error",
        message: "Something went wrong. Please try again later"
      })
    }
  },
  /**
   * @Api_Name : getCityById (GET API)
   * @usage : get city details by id
   * @Request_Params : city_id
   * @Response : City Object with id,name,lat,lng
   */
  getCityById: (req: express.Request, res: express.Response) => {
    try{
      let city_id = +req.params.city_id;
      if(!city_id){
        return res.status(400).json({
          code: "BadRequestError",
          message: "City id required"
        })
      }
      let index = cityList.findIndex((x)=> {return Number(x.id) == city_id});
      if(index <= -1){
        return res.status(404).json({
          code: "NotFoundError",
          message: "not found"
        })
      }
      res.json({
        id  : cityList[index].id,
        name: cityList[index].name,
        lat : cityList[index].coord.lat,
        lng : cityList[index].coord.lon
      });
    }catch(err){
     res.status(500).json({
       code: "error",
       message: "Something went wrong. Please try again later"
     })
    }
  },
    /**
   * @Api_Name : City Weather (GET API)
   * @usage : Get city weather from city_id
   * @Request_Params : city_id
   * @Response : An object with weather details
   */
  cityWeather: async(req: express.Request, res: express.Response)=> {
    try{
      let city_id = +req.params.city_id;
      let index = cityList.findIndex((x)=> {return x.id == city_id});
      if(index <= -1){
        return res.status(404).json({
          code: "NotFoundError",
          message: "not found"
        })
      }
      let cityWeather:any = await service.getCityWeather(cityList[index].coord.lat, cityList[index].coord.lon);
      let responseObj = {
        type            : cityWeather.weather[0].main,
        type_description: cityWeather.weather[0].description,
        sunrise         : new Date(cityWeather.sys.sunrise * 1000),
        sunset          : new Date(cityWeather.sys.sunset * 1000),
        temp            : cityWeather.main.temp,
        temp_min        : cityWeather.main.temp_min,
        temp_max        : cityWeather.main.temp_max,
        pressure        : cityWeather.main.pressure,
        humidity        : cityWeather.main.humidity,
        clouds_percent  : cityWeather.clouds.all,
        wind_speed      : cityWeather.wind.speed
      }
      res.json(responseObj);
    }catch(err){
      res.status(500).json({
        code: "error",
        message: "Something went wrong. Please try again later"
      })
    }
  }
}



export default cityController;