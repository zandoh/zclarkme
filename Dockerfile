FROM node:20-slim AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Build the app
RUN npm run build

# Production image
FROM node:20-slim AS runner

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy built assets from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install production dependencies only
RUN npm ci --production

# Set environment variables
ENV NODE_ENV=production
ENV PORT=80

# Expose the port
EXPOSE 80

# Start the app
CMD ["npm", "run", "start"]