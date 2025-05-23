FROM node:18-alpine

WORKDIR /app

# Copy package and install dependencies
COPY package.json package-lock.json ./
RUN npm install --force

# Fix esbuild mismatch issue
RUN npm rebuild esbuild

# Optional: global serve tool
RUN npm i -g serve

# Copy rest of the code
COPY . .

# Build app
RUN npm run build

# Serve on port 3001
EXPOSE 3001
CMD [ "serve", "-s", "dist", "-l", "3001" ]
