import express, { response } from "express";
import RegistrationService from "./service";
import path from "path";

const RegistrationRouter = express.Router();

RegistrationRouter.get(
  "/",
  (request: express.Request, response: express.Response) => {
    return response.send({ status: true });
  }
);

RegistrationRouter.post(
  "/register",
  async (request: express.Request, response: express.Response) => {
    try {
      const result = await RegistrationService.registerUser(request.body);
      console.log(result);
      return response.json({
        status: true,
        data: {
          url: result,
        },
      });
    } catch (e) {
      return response.json({ status: false, message: "Please Retry" });
    }
  }
);

RegistrationRouter.post(
  "/success",
  async (request: express.Request, response: express.Response) => {
    try {
      const result = await RegistrationService.updatePaymentStatus(
        request.body
      );
      if (result) {
        return response.json({
          status: true,
          message: "Registration Successfull",
        });
      }

      return response.json({ status: false, message: "Payment Failed" });
    } catch (e) {
      return response.json({ status: false, message: "Payment Failed" });
    }
  }
);

export default RegistrationRouter;
