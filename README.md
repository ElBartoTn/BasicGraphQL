# Daze API

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `yarn start` command to start server
   Or Run `yarn test` command to launch tests
4. Go to http://127.0.0.1:4000/graphql :
   To test registation run
   mutation{
   register (email: "whatever you want",password: "what ever you want"){
   path,
   message,
   resultCode
   }
   }

You can test different use case : already used email, invalid email, invalid password ..
