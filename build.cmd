@ECHO OFF
npm install
npm run build
npm run prisma:init:local
@ECHO ON