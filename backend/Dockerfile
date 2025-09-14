# Stage 1: Use the official Node.js 18 Alpine image for a small footprint
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# V V V ADD THIS LINE V V V
# Change ownership of all files in the /app directory to the new user
RUN chown -R appuser:appgroup /app

# Now, switch to the non-root user
USER appuser

# Expose the port the app runs on
EXPOSE 5000

# The command to run the application
CMD ["node", "index.js"]

