# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the NestJS application will listen on
EXPOSE 3000

# Set the command to run the NestJS application
CMD ["npm", "run", "start:prod"]
