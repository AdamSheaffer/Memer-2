FROM node:20-alpine

ADD . /src
WORKDIR /src

ARG FIREBASE_VERSION=13.3.0

RUN apk --no-cache add openjdk11-jre bash curl openssl gettext nano nginx sudo && \
    npm cache clean --force && \
    npm i -g firebase-tools@$FIREBASE_VERSION
RUN npm i -g firebase-tools
RUN firebase --version
RUN cd functions && npm run build
EXPOSE  4000 4400 5001 8000 9000 9099