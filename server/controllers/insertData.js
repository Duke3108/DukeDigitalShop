import Product from "../models/product.js";
import Category from "../models/productCategory.js"
import asyncHandler from "express-async-handler";
import { readFileSync } from 'fs';
import cateData from '../../data/categoryData.js'
const data = JSON.parse(readFileSync(new URL('../../data/ecommerce.json', import.meta.url)));
import slugtify from 'slugify'

const fn = async (product) => {
    await Product.create({
        title: product?.name,
        slug: slugtify(product?.name) + Math.round(Math.random() * 10000) + '',
        description: product?.description,
        brand: product?.brand,
        price: Math.round(Number(product?.price?.match(/\d/g).join('')) / 100),
        category: product?.category[1],
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 100),
        images: product?.images,
        thumb: product?.thumb,
        color: product?.variants?.find(el => el.label === 'Color')?.variants[0],
        totalRatings: 0
    })
}


export const insertProduct = asyncHandler(async (req, res) => {
    const promises = []
    for (let product of data) promises.push(fn(product))
    await Promise.all(promises)
    return res.json('Done')
})

const fn2 = async (cate) => {
    await Category.create({
        title: cate?.cate,
        brand: cate?.brand,
        image: cate?.image
    })
}

export const insertCategory = asyncHandler(async (req, res) => {
    const promises = []
    for (let cate of cateData) promises.push(fn2(cate))
    await Promise.all(promises)
    return res.json('Done')
})