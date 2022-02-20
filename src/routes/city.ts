
import express from 'express';
import cityController from '../controller/cityController';

const router: express.Router = express.Router();

router.get('/cities', cityController.getCityList);
router.get('/cities/:city_id', cityController.getCityById);
router.get('/cities/:city_id/weather', cityController.cityWeather);

export default router;