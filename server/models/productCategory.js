import mongoose from "mongoose";// Erase if already required

// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    brand: {
        type: Array,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

//Export the model
const productCategory = mongoose.model('ProductCategory', productCategorySchema);
export default productCategory