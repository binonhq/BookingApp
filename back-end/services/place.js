const PlaceModel = require("../models/place");

exports.getAllPlaces = async () => {
    return await PlaceModel.find({});
}

exports.addPlace = async (place) => {
    return await PlaceModel.create(place);
}

exports.getPlaceById = async (id) => {
    return await PlaceModel.findById(id);
}

exports.updatePlace = async (id, place) => {
    return await PlaceModel.findByIdAndUpdate(id, place);
}

exports.deletePlace = async (id) => {
    return await PlaceModel.findByIdAndDelete(id);
}
