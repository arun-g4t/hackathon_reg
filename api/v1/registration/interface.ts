import { ITeam } from "../../../DB/interfaces/participant";

export type ITeamCreate = Pick<ITeam, "teamName" | "teamMembers">;

let team: ITeamCreate = {
  teamName: "unique_team_name",
  teamMembers: [
    {
      memberName: "Alice",
      email: "alice@email.com",
      phone: "9898989898",
      dob: new Date(),
      semester: 3,
      usn: "2234",
      organization: "grow4tech",
    },
    {
      memberName: "Bob",
      email: "bob@email.com",
      phone: "9797979797",
      organization: "grow4tech",
      dob: new Date(),
      usn: "3234",
      semester: 3,
    },
  ],
};
