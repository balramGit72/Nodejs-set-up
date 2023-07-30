
import express from 'express';
import helloWorld from './controller/index.js';
import User from './models/user.js';

const router = express.Router();

router.get('/', helloWorld);
  
  router.get('/contact', (req, res) => {
    res.send('Contact us at contact@example.com');
  });

  import jwt from 'jsonwebtoken';
  import bcrypt from 'bcryptjs';
// Replace this secret with a strong, random string in production.
const secretKey = 'your_secret_key';

// Function to generate a JWT token for a user
const generateToken = (user) => {
    const payload = {
      id: user.id,
      email: user.email
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
  };
  

  // Custom middleware to verify the token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    console.log('token: ', token);
  
    if (!token) {
      return res.status(401).json({ error: 'Token missing.' });
    }
  
    // Verify the token using the secret key
    jwt.verify(token, secretKey, (err, decoded) => {
    console.log('decoded: ', decoded);
      if (err) {
        return res.status(401).json({ error: 'Invalid token.' });
      }
  
      // Token is valid, attach the decoded user data to the request for later use
      req.user = decoded;
      next();
    });
  };
  

  export const checkUserExists = async (req, res, next) => {
    try {
      const userId = req.params.id; // Assuming you have a route parameter for the user ID
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
     const token = generateToken(user)
     console.log('token: ', token);
      req.user = user; // Attach the user object to the request for later use in route handlers
      next();
    } catch (error) {
    console.log('error: ', error);
      res.status(500).json({ error: 'Failed to check user existence.' });
    }
  };

  // GET /users/:id route with the checkUserExists middleware
router.get('/users/:id',verifyToken, checkUserExists, (req, res) => {
    // The user object is available from the middleware
    res.json(req.user);
  });

  // Create a new user
router.post('/users', async (req, res) => {
    try {
      const { name, email } = req.body;
  
      // Create a new user instance with the provided name and email
      const user = await User.create({ name, email });
  
      res.json(user);
    } catch (error) {
    console.log('error: ', error);
      res.status(500).json({ error: 'Failed to create user.' });
    }
  });
 export default router;