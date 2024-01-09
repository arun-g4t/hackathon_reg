import { ITeam } from "../../../DB/interfaces/participant";

export type ITeamCreate = Pick<ITeam, "teamName" | "teamMembers">;

let team: ITeamCreate = {
  teamName: "unique_team_name",
  teamMembers: [
    {
      memberName: "Alice",
      email: "alice@email.com",
      phone: "9898989898",
      organization: "grow4tech",
    },
    {
      memberName: "Bob",
      email: "bob@email.com",
      phone: "9797979797",
      organization: "grow4tech",
    },
  ],
};
