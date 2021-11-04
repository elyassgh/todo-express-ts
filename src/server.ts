import 'dotenv/config';
import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import App from './app';
// import all controllers
import Todocontroller from './modules/controller/todo.controller';
import UserController from './modules/controller/user.controller';
import validateEnv from './utils/env.validator';

// validate env variables
validateEnv();

// configure data base connectivity before initalizing typedi container
getConnectionOptions().then((options) => {
    createConnection(options)
        .then((connection) => {
            console.log("database connected successfully.");
            // bootsrap controllers & run the application
            const app = new App(
                // bind all controllers to the app instance.
                [
                    new UserController(),
                    new Todocontroller(),
                    /*  
                     new DummyController(),
                     new FunnyController(),
                     new PonnyController(),
                    */
                ],
            );
            app.listen();
        })
        .catch(error => {
            console.error(`Couldn't connect to the database!`);
            console.error(error);
        });
});