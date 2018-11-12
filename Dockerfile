FROM node:11

WORKDIR /build-scripts
ADD . /build-scripts

RUN yarn jest --ci
