// routes/languageRoutes.js

import express from 'express'
const router = express.Router();
import {getLanguages} from '../controllers/language.js'

router.get('/languages', getLanguages);


export { router as LanguageRoute };
