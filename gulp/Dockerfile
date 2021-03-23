FROM node:15.11.0-slim

RUN apt-get update && apt-get install python make gcc g++ -y

ENV INSTALL_PATH /app

RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY . .