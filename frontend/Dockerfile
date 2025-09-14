# --- STAGE 1: The Builder ---
# Use Node.js 18 Alpine for the build environment
FROM node:18-alpine as builder
WORKDIR /app

# Declare the build arguments that we expect from docker-compose
# These are required for the build process.
ARG VITE_FIREBASE_APIKEY
ARG VITE_SERVER_URL

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your frontend source code
COPY . .

# Run the build script, injecting the variables into the process.
# This bakes the correct values into the final static files.
RUN VITE_FIREBASE_APIKEY=$VITE_FIREBASE_APIKEY VITE_SERVER_URL=$VITE_SERVER_URL npm run build

# --- STAGE 2: The Production Server ---
# Use a lightweight Nginx server for the final image
FROM nginx:stable-alpine
# Copy the built static files from the 'builder' stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80
# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

