import { ObjectId } from "mongoose";
import ParticipantModel from "../../../DB/models/participants";
import { IParticipant } from "../../../DB/interfaces/participant";
import { generateUniqueId } from "../../../utils/generateUniqueId";

class RegistrationDatabase {
  static async registerUser({
    name,
    college,
  }: {
    name: string;
    college: string;
  }) {
    try {
      const transactionId = generateUniqueId();
      const newParticipant = new ParticipantModel({
        name,
        college,
        transactionId,
      });

      const result = await newParticipant.save();
      return { _id: result, name, college, transactionId };
    } catch (e) {
      console.error(e);
      throw new Error("Unable to create user. Please try again");
    }
  }

  static async updateUser(id: string | ObjectId, data: Partial<IParticipant>) {
    try {
      const { transactionId } = data;
      const result = await ParticipantModel.updateOne(
        {
          transactionId: id,
        },
        {
          $set: {
            payment: true,
          },
        }
      );
      if (result) return true;
      return false;
    } catch (e) {
      console.error(e);
      throw new Error("Unable to create user. Please try again");
    }
  }

  static async userExists(id: string | ObjectId) {
    const result = await ParticipantModel.findOne({
      $or: [
        {
          _id: id,
        },
      ],
    });
    return result;
  }
}

export default RegistrationDatabase;
