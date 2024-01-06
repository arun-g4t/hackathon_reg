import mongoose, { Document } from "mongoose";
import { IParticipant } from "../interfaces/participant";
const participantSchema = new mongoose.Schema<IParticipant & Document>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  college: {
    type: String,
    required: true,
  },
  payment: {
    type: Boolean,
    required: true,
    default: false,
  },
  transactionId: {
    type: String,
  },
});

const ParticipantModel = mongoose.model<IParticipant & Document>(
  "particiapnt_collection",
  participantSchema
);
export default ParticipantModel;
