

import {Router } from "express";
import { LoginUser, RegisterUser } from "../controllers/authController.js";

const router = Router();



/** 
 * @openapi
 * /api/auth/register:
 * *   post:
 * *     summary: Register a new user
 *    tags:
 * *       - Authentication
 *    requestBody:
 * *       required: true
 *       content:
 *  
 * *         application/json:
 * *           schema:
 *  
 * *             type: object
 *            properties:
 *              name:
 *               type: string
 *              email:
 *              type: string
 *              password:
 *              type: string
 *     responses:
 *      201:
 *        description: User registered successfully
 *       content:
 *  
 *        application/json:
 *  
 *         schema:
 *  
 *  
 *  
 *            type: object
 *            properties:
 *             message:
 *              type: string
 *            user:
 *  
 *             type: object
 *            properties:
 *              id:
 *              type: string
 *  
 *             name:
 *  
 *            type: string
 *  
 *  
 *            email:
 * 
 * 
 * 
 */
router.post("register", RegisterUser);
router.post("login", LoginUser);


export default router;