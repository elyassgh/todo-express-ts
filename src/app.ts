import * as express from 'express';
import Controller from './core/interfaces/controller.interface';
import errorMiddleware from './core/middleware/error.middleware';
import listEndpoints = require('express-list-endpoints');

class App {

    private app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();
        // this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
            console.table(listEndpoints(this.app._router))
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    /*  private connectToTheDatabase() {
         const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, } = process.env;
         mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`).then(() => {
             console.log("database connected successfully.");
         });
     } */
}

export default App;