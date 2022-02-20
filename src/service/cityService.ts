
import axios from 'axios';

let exportFunctions = {
    calculateDistanceBetweenTwoPoints(lat1:number, lon1: number, lat2: number, lon2: number) {
      let radlat1 = Math.PI * lat1/180
      let radlat2 = Math.PI * lat2/180
      let theta = lon1-lon2
      let radtheta = Math.PI * theta/180
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist)
      dist = dist * 180/Math.PI
      dist = dist * 60 * 1.1515
      dist = dist * 1.609344;
      return dist
    },
    getCityWeather: (lat: number, lon: number)=> {
      return new Promise(async(resolve, reject) => {
        try{
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e2fc332ea4120892a8badf1769b0d407`);
          resolve(response.data);
        }catch(err){
          reject(err);  
        }  
      })
    }
}

export default exportFunctions;
