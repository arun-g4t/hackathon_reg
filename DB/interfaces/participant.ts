export interface IParticipant {
  name: string;
  email: string;
  college: string;
  payment?: boolean;
  transactionId?: string;
}
