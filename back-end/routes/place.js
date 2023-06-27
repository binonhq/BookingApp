const express = require("express");
const {
    getAllPlaces,
    addPlace,
    getPlaceById,
    updatePlace,
    deletePlace,
} = require("../controllers/place");
const router = express.Router();

router.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = "photo" + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + "\\uploads\\" + newName,
    })
    res.json(newName);
})

router.route("/").get(getAllPlaces).post(addPlace);
router.route("/:id").get(getPlaceById).put(updatePlace).delete(deletePlace);

module.exports = router;
