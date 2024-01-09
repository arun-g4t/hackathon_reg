import mongoose, { Document } from "mongoose";
import { ITeam, IParticipant } from "../interfaces/participant";
const participantSchema = new mongoose.Schema<IParticipant>({
  memberName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
});

const teamSchema = new mongoose.Schema<ITeam & Document>({
  teamName: {
    type: String,
    unique: true,
    index: true,
    required: [true, "Why no team name??"],
  },
  teamSize: {
    type: Number,
    min: [1, "Atleast one hacker in a team"],
    max: [5, "Not more than five hackers in the hood"],
    default: 1,
  },
  teamMembers: {
    type: [participantSchema],
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
  createdAt: {
    type: Date,
  },
  paymentAt: {
    type: Date,
  },
});

const TeamModel = mongoose.model("team_collection", teamSchema);
export default TeamModel;
