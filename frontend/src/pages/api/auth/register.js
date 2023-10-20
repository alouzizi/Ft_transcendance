import axios from 'axios';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('http://your-nestjs-server/auth/register', req.body);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ error: 'Registration failed' });
    }
  }
};
