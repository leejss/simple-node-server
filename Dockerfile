# Base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json file and package-lock.json file
COPY package*.json ./


# Install the dependencies
RUN npm ci

# Copy the rest of the files
COPY . .

# Build
RUN npm run build

# Expose the port
EXPOSE 3000


# Start the server
CMD ["node", "dist/index.mjs"]