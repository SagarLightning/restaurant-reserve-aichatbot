import express from 'express'
import {addProduct, listProducts, removeProduct, singleProduct} from '../controllers/productController.js'
import upload from '../middlewares/multer.js'
import adminAuth from '../middlewares/adminAuth.js'

const productRouter=express.Router()

productRouter.post('/add', upload.single("image"), adminAuth, addProduct)
productRouter.get('/list',listProducts)
productRouter.post('/remove',adminAuth, removeProduct)
productRouter.get('/single', singleProduct)

export default productRouter