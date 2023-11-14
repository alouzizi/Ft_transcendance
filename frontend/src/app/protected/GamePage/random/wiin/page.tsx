"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import 'tailwindcss/tailwind.css';

const PingPongPage: React.FC = () => {
  const [isPongVisible, setIsPongVisible] = useState(false);

  const togglePong = () => {
    setIsPongVisible(!isPongVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Ping Pong Animation</h1>
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: isPongVisible ? '100%' : '-100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="bg-blue-500 text-white p-4 rounded-full inline-block cursor-pointer"
        >
          Pong
        </motion.div>
        <br />
        <button
          onClick={togglePong}
          className="mt-4 bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Toggle Ping Pong
        </button>
      </div>
    </div>
  );
};

export default PingPongPage;
