import { createHash, verify } from "crypto";
import { IParticipant } from "../../../DB/interfaces/participant";
import axios from "axios";
import RegistrationDatabase from "./database";
import { response } from "express";
import { initPayment } from "../../../payments/test";
import { generateUniqueId } from "../../../utils/generateUniqueId";
import { ObjectId } from "mongoose";

class RegistrationService {
  static async registerUser(data: IParticipant) {
    try {
      const { name, college, payment = false } = data;

      const result = await RegistrationDatabase.registerUser({ name, college });

      const paymentDetails = await initPayment(result.transactionId);
      if (paymentDetails.success) {
        return paymentDetails.data.instrumentResponse.redirectInfo.url;
      } else {
        throw Error("Retry");
      }
    } catch (e) {
      if (e) {
        console.error(e);
        return "Some error occured";
      }
    }
  }

  static async updatePaymentStatus(data: {
    code: string;
    transactionId: string;
  }) {
    try {
      const { transactionId, code } = data;

      if (code !== "PAYMENT_SUCCESS") return false;

      const result = await RegistrationDatabase.updateUser(transactionId, {
        transactionId,
      });

      return result;
    } catch (e) {
      console.error(e);
      return "Some error occured";
    }
  }
}

export default RegistrationService;
