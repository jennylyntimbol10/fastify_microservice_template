#!/usr/bin/sh
set -e
npm install
npm run build
npm run prisma:init:local