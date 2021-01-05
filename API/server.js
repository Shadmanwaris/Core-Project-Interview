import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import routes from './routes/session';

var cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Expires, Authorization, Accept, Cache-Control, Pragma");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
})

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
}))

app.use(function (req, res, next) {
  var token = req.headers['authorization'];
  if (!token) {
    req.user = undefined;
    next();
  }
  else {
    token = token.replace('bearer ', '');
    jwt.verify(token, 'llp', function (err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });

  }
});
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send({ info: 'Node js, Express, and Postgres API...' });
});

app.get('/api', (req, res) => {
  return res.send({ info: 'Congragulation, API is working' })
})

app.use((req, res, next) => {
  res.status(404).send({ info: 'Page Not Found' });
})

app.listen(port, () => {
  console.log(`Server  listening at http://localhost:${port}`);
});