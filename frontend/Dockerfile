# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend code to the container
COPY . .

# Expose port 3000
EXPOSE 3000

# Define the command to start the Next.js app
CMD ["npm", "run", "dev"]
