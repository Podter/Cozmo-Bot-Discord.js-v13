### Cozmo-Bot
A Discord bot named "Cozmo" (aka. Podter's Bot)

## Prerequisites
- Node.js (LTS)
- Spotify API
- MongoDB
- Genius API

Put API keys/tokens to `.env` file (copy `example.env` and then rename it to `.env`)
And then install dependencies
```
npm install
```

> NOTE: Made for linux lol

## Development
Run this and it will watch for changes! Make change some file, save it and it will restart automatically
```
npm run dev
```

## Build and run
# JavaScript
Run this to build to `./dist`
```
npm run build
```
And then run it
```
npm start
```
# Docker
Run this to build to Docker image `podter/cozmo-bot`
```
npm run build:docker
```
And then run it! It will read .env file
```
npm run start:docker
```
or
```
docker run -d -p 8080:8080 -e TOKEN=$TOKEN -e SPOTIFY_CLIENT_ID=$SPOTIFY_CLIENT_ID -e SPOTIFY_CLIENT_SECRET=$SPOTIFY_CLIENT_SECRET -e MONGO_URI=$MONGO_URI -e GENIUS_ACCESS_TOKEN=$GENIUS_ACCESS_TOKEN --name cozmo-bot podter/cozmo-bot
```
