#!/bin/bash
set -e

echo "Deployment started.."

#Pull the latest version of the app

git pull origin main

echo "New changes copy .."

echo "Installation Dependencies .."

yarn install

echo "Chreating Production  build.."

yarn run build

echo "Deploy finished"