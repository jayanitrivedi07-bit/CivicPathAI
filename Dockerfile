FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json from backend
COPY backend/package*.json ./backend/

# Install production dependencies
RUN cd backend && npm install --production

# Copy the rest of the project (backend and frontend folders)
COPY . .

# Ensure the app listens on the correct port (Cloud Run defaults to 8080)
EXPOSE 8080
ENV PORT=8080

# Start the Node.js server
CMD ["node", "backend/server.js"]
