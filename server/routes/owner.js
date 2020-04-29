const router = require("express").Router();
const Owner = require("../models/owner");

//POST

router.post("/owners", async (req, res) => {
    try {
        let owner = new Owner();
        owner.name = req.body.name;
        owner.about = req.body.about;

        await owner.save();
        res.json({
            success:true,
            message: "Successfully created new owner"
        });
    }catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

//GET

router.get("/owners",  async (req, res) => {
    let owners = await Owner.find();
    res.json({

        owners: owners

    });
});

module.exports = router