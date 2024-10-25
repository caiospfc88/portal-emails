# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.16.0

# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

################################################################################
# Create a stage for installing dependencies and building the application.
FROM base as build

# Copy the package.json and package-lock.json (if exists) into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Generate the Prisma Client
RUN npx prisma generate

# Run the build script to generate the production files
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies.
FROM base as final

# Use production node environment by default.
ENV NODE_ENV production

# Set working directory
WORKDIR /usr/src/app

# Copy the production dependencies and the built application from the build stage.
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/package.json ./package.json

# Expose the port that the application listens on.
EXPOSE 3001

# Run the application.
CMD ["npm", "start"]