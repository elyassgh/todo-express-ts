# Official node js image ( Layer 1 )
FROM node:12

# Working directory ( Layer 2 )
WORKDIR /app

# Copy package.json to keep dependcy cached & updated
COPY package.json ./

# Install depencies and cache them
RUN npm install

# Copy local directory to current working directory (in the container)
# watch out for node_modules or similar directory ( it should not be copied)
# Solution : use .dockerignore file ( like .gitignore )
COPY . .

# Set an environement variable for the container
# ENV PORT=8090

# Listening port for the container
EXPOSE 8090

# The command that runs the application
# CMD unlike RUN it does not start a shell session.
CMD ["npm", "start"]
