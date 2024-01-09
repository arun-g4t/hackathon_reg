import express from "express";
import path from "path";

const ClientRouter = express.Router();

ClientRouter.get("", (request: express.Request, response: express.Response) => {
  return response.sendFile(
    path.join(__dirname, "../../../../client/registration.html")
  );
});

ClientRouter.get(
  "/register",
  (request: express.Request, response: express.Response) => {
    return response.sendFile(
      path.join(__dirname, "../../../../client/registration.html")
    );
  }
);

export default ClientRouter;
