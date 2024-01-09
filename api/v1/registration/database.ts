import mongoose, { MongooseError, ObjectId, mongo } from "mongoose";
import TeamModel from "../../../DB/models/participants";
import { IParticipant, ITeam } from "../../../DB/interfaces/participant";
import { generateUniqueId } from "../../../utils/generateUniqueId";
import { ITeamCreate } from "./interface";

class RegistrationDatabase {
  static async registerTeam({ teamName, teamMembers }: ITeamCreate) {
    try {
      const transactionId = generateUniqueId();
      const newTeam = new TeamModel({
        teamName,
        teamMembers,
        teamSize: teamMembers.length,
        transactionId,
        createdAt: new Date(),
      });

      const result = await newTeam.save();
      return { _id: result, teamName, transactionId };
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error("Unable to Register. Please try again");
    }
  }

  static async updateTeamPayment(id: string | ObjectId, data: Partial<ITeam>) {
    try {
      const { transactionId } = data;
      const result = await TeamModel.updateOne(
        {
          transactionId: id,
        },
        {
          $set: {
            payment: true,
          },
        }
      );
      return result;
    } catch (e) {
      console.error(e);
      throw new Error("Unable to create user. Please try again");
    }
  }

  static async teamExists(query: object) {
    try {
      const result = await TeamModel.findOne(query);
      return result;
    } catch (e) {
      if (e) {
        console.error(e);
        throw new Error("Some error occured");
      }
    }
  }

  static async getTeams(query: object) {
    try {
      const result = await TeamModel.find(query);
      return result;
    } catch (e) {
      if (e) {
        console.error(e);
        throw new Error("Some error occured");
      }
    }
  }
}

export default RegistrationDatabase;
