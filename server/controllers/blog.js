import asyncHandler from "express-async-handler";
import Blog from "../models/blog.js";

export const createBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body
    if (!title || !description || !category) throw new Error('Missing inputs')
    const response = await Blog.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createdBlog: response ? response : 'Can not create new blog'
    })
})

export const getAllBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find()
    return res.status(200).json({
        success: response ? true : false,
        prodCategories: response ? response : 'Can not find any blog'
    })
})

export const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updatedBlog: response ? response : 'Can not update this blog'
    })
})

export const deleteBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const response = await Blog.findByIdAndDelete(bid)
    return res.status(200).json({
        success: response ? true : false,
        deletedCategory: response ? response : 'Can not delete this blog'
    })
})

export const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error('Missing inputs')
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id }, $push: { likes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    }
    const isLiked = blog?.likes?.find(el => el.toString() === _id)
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    }
})

export const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error('Missing inputs')
    const blog = await Blog.findById(bid)
    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id)
    if (alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id }, $push: { dislikes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    }
    const isDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if (isDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            rs: response
        })
    }
})

export const getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const excludeFields = '-refreshToken -password -role -createdAt -updatedAt'
    const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
        .populate('likes', excludeFields)
        .populate('dislikes', excludeFields)
    return res.status(200).json({
        success: blog ? true : false,
        rs: blog
    })
})

export const uploadImageBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (!req.file) throw new Error('Mising input')
    const response = await Blog.findByIdAndUpdate(bid, { image: req.file.path }, { new: true })
    return res.status(200).json({
        status: response ? true : false,
        updatedBlog: response ? response : 'Can not update image'
    })
})