#! /bin/sh

npx prisma generate

npx prisma migrate dev --name init

npm run s