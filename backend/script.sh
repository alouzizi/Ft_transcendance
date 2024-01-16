#! /bin/sh

npx prisma generate
sleep 20
npx prisma migrate dev 
npm run s