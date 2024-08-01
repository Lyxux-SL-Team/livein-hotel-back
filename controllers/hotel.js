import {
    createHotel,
    getHotelById,
    updateHotel,
    deleteHotel,
    getAllHotel,
    getLocationAutocomplete,
    searchHotels
} from "../services/hotel.js"; 

// Controller to create a new hotel
export const createHotelController = async (req, res) => {
    try {
        const hotel = await createHotel(req.body);
        res.status(201).json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//location fit
export const fetchLocationAutocomplete = async (req, res) => {
    try {
      const locationData = req.query.input; 
      const data = await getLocationAutocomplete(locationData);
      res.json(data);
    } catch (error) {
      console.error('Error fetching location data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Controller to get a hotel by ID
export const getHotelByIdController = async (req, res) => {
    try {
        const hotel = await getHotelById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get all hotels
export const getAllHotelController = async (req, res) => {
    try {
        const hotels = await getAllHotel(); 
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to update a hotel by ID
export const updateHotelController = async (req, res) => {
    try {
        const hotel = await updateHotel(req.params.id, req.body);
        res.status(200).json(hotel);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Controller to delete a hotel by ID
export const deleteHotelController = async (req, res) => {
    try {
        await deleteHotel(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//search hotel by id name or location
export const searchHotelsController = async (req, res) => {
    try {
      const query = req.query; 
      const hotels = await searchHotels(query);
  
      if (hotels.length === 0) {
        return res.status(404).json({ message: 'No hotels found' });
      }
  
      return res.status(200).json(hotels);
    } catch (error) {
      console.error(`Error in searchHotelsController: ${error.message}`);
      return res.status(500).json({ message: `Error searching hotels: ${error.message}` });
    }
  };