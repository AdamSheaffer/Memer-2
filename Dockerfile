FROM node:14.20.0

ADD . /src
WORKDIR /src
# Install OpenJDK-11
RUN echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list

RUN apt-get update && \
  apt-get install -y openjdk-11-jre-headless && \
  apt-get clean;
RUN npm i -g firebase-tools
RUN firebase --version
RUN cd functions && npm run build
EXPOSE  4000 4400 5001 8000 9000 9099