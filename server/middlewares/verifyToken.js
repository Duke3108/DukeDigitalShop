import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

export const verifyAccessToken = asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) return res.status(401).json({
                success: false,
                mes: 'Invalid access token'
            })
            req.user = decode
            next()
        })
    } else {
        return res.status(401).json({
            success: false,
            mes: 'Require authentication'
        })
    }
})

export const isAdmin = asyncHandler(async (req, res, next) => {
    const { role } = req.user
    if (+role !== 3108) // 3108: Admin
        return res.status(401).json({
            success: true,
            mes: 'Require admin role'
        })
    next()
})