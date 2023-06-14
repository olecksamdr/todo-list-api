# Based on smartiniOnGitHub/fastify-example Dockerfile
# https://github.com/smartiniOnGitHub/fastify-example/blob/master/Dockerfile
# and
# https://github.com/BretFisher/node-docker-good-defaults/blob/main/Dockerfile
FROM node:16.20.0-buster-slim as builder

# update packages, to reduce risk of vulnerabilities
RUN apt-get update && apt-get upgrade -y && apt-get autoclean -y && apt-get autoremove -y

# set a non privileged user to use when running this image
RUN groupadd -r nodejs && useradd -g nodejs -s /bin/bash -d /home/nodejs -m nodejs
USER nodejs
# set right (secure) folder permissions
RUN mkdir -p /home/nodejs/app/node_modules && chown -R nodejs:nodejs /home/nodejs/app

WORKDIR /home/nodejs/app

# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
# if you run your npm install with --production flag or set your NODE_ENV 
# as production, all devDependencies will not be installed
ENV NODE_ENV=${NODE_ENV}

# By default, Fastify (and many other web servers) bind to the loopback IP address (127.0.0.1)
# when running on the host machine, which means that it can only receive connections
# from the same machine. However, when running inside a Docker container,
# the container’s loopback IP address is not accessible from the host machine or other machines on the network.

# To allow incoming connections to reach Fastify inside the container,
# we need to bind to an IP address that is accessible from outside the container.
# Binding to 0.0.0.0 is a way to bind to all available network interfaces on the container,
# which means that Fastify will be able to receive connections from any IP address that can reach the container.
ARG HOST=0.0.0.0
ENV HOST $HOST

# default to port 3000 for node, and 9229 and 9230 (tests) for debug
ARG PORT=3000
ENV PORT $PORT

EXPOSE $PORT

# Copy package.json and package-lock.json before copy code into the container.
# Docker will cache installed node_modules as a separate layer, then,
# if you change your app code and execute the build command, the node_modules
# will not be installed again if you did not change package.json
COPY --chown=nodejs:nodejs package*.json ./

# install dependencies here, for better reuse of layers
RUN npm install && npm audit fix && npm cache clean --force

# copy all sources in the container (exclusions in .dockerignore file)
COPY --chown=nodejs:nodejs . .

# build/pack binaries from sources

# This results in a single layer image
# FROM node:lts-alpine AS release
# COPY --from=builder /dist /dist

# ENTRYPOINT [ "node" ]
# CMD [ "npm", "start" ]

# At the end, set the user to use when running this image
USER node

CMD [ "node", "./build/index" ]

# end.