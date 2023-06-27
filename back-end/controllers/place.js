const placeService = require("../services/place");

exports.getAllPlaces = async (req, res) => {
    try {
        const places = await placeService.getAllPlaces();
        res.json({ data: places, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addPlace = async (req, res) => {
    try {
        const place = await placeService.addPlace(req.body);
        res.json({ _id: place._id, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPlaceById = async (req, res) => {
    try {
        const place = await placeService.getPlaceById(req.params.id);
        res.json({ data: place, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePlace = async (req, res) => {
    try {
        const place = await placeService.updatePlace(req.params.id, req.body);
        res.json({ data: place, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePlace = async (req, res) => {
    try {
        const place = await placeService.deletePlace(req.params.id);
        res.json({ data: place, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
