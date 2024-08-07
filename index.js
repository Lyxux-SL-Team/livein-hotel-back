import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import "./db/mongoose.js";

import  {AdminRouter}  from './routes/admin.js';  
import {PropertyRouter} from './routes/property.js'
import { HotelRouter } from './routes/hotel.js';
import {HotelPropertyRoute} from './routes/hotelProperty.js'
import {ContractRoute} from './routes/contract.js'
import {LanguageRoute} from './routes/language.js'
import { PolicyRouter} from './routes/policy.js'
import {amenitiesRouter} from './routes/amenities.js'

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/admin', AdminRouter);
app.use('/api/property',PropertyRouter);
app.use('/api/hotel',HotelRouter);
app.use('/api/hotelProperty',HotelPropertyRoute);
app.use('/api/contract',ContractRoute);
app.use('/api/language',LanguageRoute);
app.use('/api/policy',PolicyRouter);
app.use('/api/amenities',amenitiesRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
