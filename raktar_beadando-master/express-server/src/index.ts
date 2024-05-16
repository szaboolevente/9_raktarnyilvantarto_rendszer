import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as cors from "cors";
import { getAllRoutes } from "./routes";

createConnection().then(async connection => {
    const app = express();
    const PORT = 5000;

    app.use(express.json());
    app.use(cors())
    
    app.use(getAllRoutes());

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT} ...`);
    });

}).catch(error => console.log(error));
