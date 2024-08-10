!#/bin/bash
# script for the dockerized local development environment
echo "Start running the local container for simple node server"

# Build docker image
docker build -t simple-node-server .

# Running the container
docker run -d -p 3000:3000 simple-node-server




