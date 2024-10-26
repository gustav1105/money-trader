# Step 1: Build Stage for Node.js
FROM node:18 as build-stage

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code and build it
COPY . .
RUN npm run build --prod

# Step 2: Serve the App with NGINX
FROM nginx:alpine

# Copy the build output to NGINX directory
COPY --from=build-stage /app/dist/exchange-converter/browser /usr/share/nginx/html

# Expose port 80 for NGINX
EXPOSE 80

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]

