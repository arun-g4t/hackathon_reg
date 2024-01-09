import RegistrationDatabase from "./database";
import { initPayment } from "../../../payments/test";
import mongoose, { isValidObjectId } from "mongoose";
import { ITeamCreate } from "./interface";
import { ITeam } from "../../../DB/interfaces/participant";

class RegistrationService {
  static async registerUser(data: ITeamCreate) {
    try {
      const { teamName, teamMembers } = data;

      const teamExists = await RegistrationService.teamExists(
        teamName as string
      );
      console.log(teamExists);
      if (teamExists) {
        throw new Error("Team Name already exists");
      }
      const teamSize = teamMembers.length;

      const result = await RegistrationDatabase.registerTeam({
        teamName,
        teamMembers,
      });

      const paymentDetails = await initPayment(result.transactionId, teamSize);

      console.log(paymentDetails);

      if (paymentDetails.success) {
        return {
          team: teamName,
          url: paymentDetails.data.instrumentResponse.redirectInfo.url,
        };
      } else {
        throw Error("Retry");
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        return e.message;
      } else {
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

      const result = await RegistrationDatabase.updateTeamPayment(
        transactionId,
        {
          transactionId,
        }
      );

      return result;
    } catch (e) {
      console.error(e);
      return "Some error occured";
    }
  }

  static async teamExists(id: string) {
    try {
      let query = {};
      if (isValidObjectId(id)) {
        query = {
          _id: new mongoose.Types.ObjectId(id),
        };
      } else {
        query = {
          teamName: id,
        };
      }

      const result = await RegistrationDatabase.teamExists(query);
      return result;
    } catch (e) {
      if (e) {
        console.error(e);
        return "Some error occured";
      }
    }
  }

  static async getTeams({
    teamName,
    payment,
  }: {
    teamName?: string;
    payment?: boolean;
  }) {
    console.log(teamName, payment);

    let query = {};
    if (teamName) {
      query = {
        teamName,
      };
    } else if (!teamName && payment) {
      query = {
        payment,
      };
    }

    const result = await RegistrationDatabase.getTeams(query);
    return result;
  }

  static async makePayment({ team }: { team: string }) {
    try {
      const teamExists = (await this.teamExists(team)) as ITeam;
      if (!teamExists) {
        throw new Error("Team doesn't exist");
      }
      const paymentDetails = await initPayment(
        teamExists.transactionId as string,
        teamExists.teamSize
      );

      console.log(paymentDetails);

      if (paymentDetails.success) {
        return {
          team,
          url: paymentDetails.data.instrumentResponse.redirectInfo.url,
        };
      } else {
        throw Error("Retry");
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        return e.message;
      } else {
        return "Some error occured";
      }
    }
  }
}

export default RegistrationService;
