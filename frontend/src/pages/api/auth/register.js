// import axios from 'axios';

// export default async (req, res) => {
//   if (req.method === 'POST') {
//     try {
//       const response = await axios.post('http://your-nestjs-server/auth/register', req.body);
//       res.status(200).json(response.data);
//     } catch (error) {
//       res.status(400).json({ error: 'Registration failed' });
//     }
//   }
// };


export default async (req, res) => {
  if (req.method === 'POST') {
    const userData = req.body;

    // Add your registration logic here
    try {
      // Perform user registration
      // You can interact with your NestJS server or your database here
      // Return a success response if registration is successful
      res.status(200).send('Registration successful');
    } catch (error) {
      // Handle registration error
      console.error('Registration error:', error);
      res.status(500).send('Registration failed');
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};