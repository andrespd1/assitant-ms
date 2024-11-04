# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install nodemon globally for development
RUN npm install -g nodemon

# Expose the port the app runs on
EXPOSE 3000

# Default command
CMD ["nodemon", "-r", "tsconfig-paths/register", "src/index.ts"]
