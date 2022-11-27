## Install packages

###### Startup packages

`npm i apollo-server-express cookie-parser cors dotenv express graphql graphql-upload @prisma/client`

###### Other packages

`npm i jsonwebtoken bcryptjs `

###### Dev dependencies

`npm i nodemon --save-dev`

## Prisma commands

> No need to run these commands in this app. Just for reference.

1. `npx prisma init`
   Then make changes to your schema.prisma file

2. Run `npx prisma generate` everytime changes is made in schema.prisma file

3. Run `npx prisma studio` to launch prisma studio.
