# Use the official Node.js image with a specific version
FROM node:18.18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]

