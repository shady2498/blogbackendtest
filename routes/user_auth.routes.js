module.exports = (app) => {
  const user_auth = require("../controllers/userAuth.controller");

  var router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /api/user_auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               user_name:
 *                 type: string
 *               profile_picture:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               first_name: John
 *               last_name: Doe
 *               user_name: johndoe
 *               profile_picture: https://example.com/profile.jpg
 *               email: johndoe@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User successfully signed up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: integer
 *                 message:
 *                   type: string
 *             example:
 *               error_code: 0
 *               message: Congratulations! You've successfully signed up
 *       400:
 *         description: Invalid request body or missing content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: integer
 *                 message:
 *                   type: string
 *             example:
 *               error_code: -1
 *               message: Content can not be empty!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: integer
 *                 message:
 *                   type: string
 *             example:
 *               error_code: -1
 *               message: Email Already exists!
 */



  // Sign up a new user
  router.post("/signup", user_auth.registerUser);

  /**
 * @swagger
 * /api/user_auth/login:
 *   post:
 *     summary: Authenticate and log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: johndoe@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_code:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     user_name:
 *                       type: string
 *                     user_id:
 *                       type: integer
 *             example:
 *               error_code: 0
 *               message: Congratulations! User Successfully Logged in
 *               data:
 *                 token: jwt_token_here
 *                 first_name: John
 *                 last_name: Doe
 *                 user_name: johndoe
 *                 user_id: 123
 *       404:
 *         description: User not found or invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 error_code:
 *                   type: integer
 *                 message:
 *                   type: string
 *             example:
 *               error: Sorry! There is no registered user with this email
 *               error_code: -1
 *               message: Invalid username or password
 */

  router.post("/login", user_auth.loginUser);

  app.use("/api/user_auth", router);
};
