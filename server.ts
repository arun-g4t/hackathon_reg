import express from "express";
import Database from "./config/dbConn";
import RegistrationRouter from "./api/v1/registration/route";
import helmet from "helmet";
import ClientRouter from "./api/v1/clientRouter/route";
class Server {
  public app = express();
  public port?: Number;

  constructor() {
    this.config();
    this.router();
  }
  private async config() {
    this.app.use(helmet());
    this.app.set("trust proxy", true);
    this.app.set("case sensitive routing", true);
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use(express.static("client"));
  }

  private async router() {
    this.app.use("/", ClientRouter);
    this.app.use("/api/v1/register", RegistrationRouter);
  }

  private async connectToDb() {
    return await Database.createConnection();
  }
  public async start(port: number) {
    await this.connectToDb();
    this.port = port;
    this.app.listen(this.port, () => {
      console.debug(`Listing at port http://localhost:${this.port}/api/v1/`);
    });
  }
}

export default Server;
