import mongoose from "mongoose";
import { IParticipant } from "../interfaces/participant";
const participantSchema=new mongoose.Schema<IParticipant &Document>({
    name :{
        type : String,
        required : true
    },
    college : {
        type : String,
        required : true
    }

})

const participantModel=mongoose.model<IParticipant & Document>(
"particiapnt_collection",
participantSchema
)
export default participantModel;