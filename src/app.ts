//import imp modules
import express from 'express';
import city from './routes/city';

const PORT = 8080;

const app: express.Application = express();

//route
app.use(city);

// catch 404 and send 404
app.use(function (req, res, next) {
  res.status(404).send('Invalid Route');
});
  
app.listen(PORT,()=> {
  console.log("Express listen at port " + PORT)
})

export default app;