# Base image
FROM node:lts-alpine

# Build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
WORKDIR /app/dist

# Some Environment Variables
ENV TOKEN=abc123
ENV SPOTIFY_CLIENT_ID=abc123
ENV SPOTIFY_CLIENT_SECRET=abc123
ENV MONGO_URI=abc123
ENV GENIUS_ACCESS_TOKEN=abc123
ENV ISTYPESCRIPT=false

# Expose port
EXPOSE 8080

# Run
CMD [ "npm", "start" ]
