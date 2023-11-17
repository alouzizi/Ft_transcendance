# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend code to the container
COPY . .

# Expose port 4000
EXPOSE 4000

# Define the command to start the NestJS app
CMD ["npm", "run", "start:dev"]
