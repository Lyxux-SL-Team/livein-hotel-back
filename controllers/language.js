// controllers/languageController.js
import {getAvailableLanguages} from '../services/language.js'


export const getLanguages = (req, res) => {
    try {
        const languages = getAvailableLanguages();
        res.json({ languages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



