import express, { response } from "express";
import RegistrationService from "./service";
import path from "path";

const RegistrationRouter = express.Router();

RegistrationRouter.get(
  "/",
  async (request: express.Request, response: express.Response) => {
    try {
      const { payment, team } = request.query;

      let payStatus: boolean | undefined;
      if (typeof payment !== "undefined") {
        if (payment === "true") {
          payStatus = true;
        } else if (payment === "false") {
          payStatus = false;
        }
      }

      const result = await RegistrationService.getTeams({
        payment: payStatus,
        teamName: team as string,
      });

      return response.json({
        status: true,
        data: result,
      });
    } catch (e) {
      if (e instanceof Error) {
        return response.json({ status: false, message: e.message });
      } else {
        return response.json({ status: false, message: "Please Retry" });
      }
    }
  }
);

RegistrationRouter.post(
  "/",
  async (request: express.Request, response: express.Response) => {
    try {
      const result = await RegistrationService.registerUser(request.body);
      console.log(result);
      return response.json({
        status: true,
        data: {
          result,
        },
      });
    } catch (e) {
      return response.json({ status: false, message: "Please Retry" });
    }
  }
);

RegistrationRouter.post(
  "/redirect",
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

RegistrationRouter.post(
  "/payment",
  async (request: express.Request, response: express.Response) => {
    try {
      const result = await RegistrationService.makePayment(request.body);
      console.log(result);
      return response.json({
        status: true,
        data: {
          result,
        },
      });
    } catch (e) {
      return response.json({ status: false, message: "Please Retry" });
    }
  }
);

export default RegistrationRouter;
