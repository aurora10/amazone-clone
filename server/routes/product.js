const router = require("express").Router();

const Product = require("../models/product");

const upload = require("../middlewares/upload-photo");

router.post("/products", upload.single("photo"), async (req, res) => {
    try {
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
        product.price = req.body.price;
        product.stockQuantity = req.body.stockQuantity;

        await product.save();
        res.json({
            status: true,
            message: "Successfully saved"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
//POST


router.get("/products", async (req, res) => {
    try {
        let products = await Product.find();
        res.json({
            success: true,
            products: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

});

router.get("/products/:id", async (req, res) => {
    try {
        let product = await Product.findOne({_id: req.params.id});
        res.json({
            success: true,
            product: product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

});

//GET products

//GET product

router.put("/products/:id", upload.single("photo") ,async (req, res) => {
    try {
        let product = await Product.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    title: req.body.title,
                    price: req.body.price,
                    category: req.body.categoryID,
                    photo: req.file.location,
                    description: req.body.description,
                    owner: req.body.ownerID
                }
            },
            {upsert: true}
            )
        ;
        res.json({
            success: true,
            updatedProduct: product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

});

//PUT


router.delete("/products/:id", async (req, res) => {
    try {
        let deletedProduct = await Product.findOneAndDelete({_id: req.params.id});

        if (deletedProduct) {
            res.json({
                status:true,
                message: "Product was successfully deleted"
            });
        }
    }catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });

    }
} );

//DELETE

module.exports = router;