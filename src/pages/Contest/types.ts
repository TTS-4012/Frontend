export enum RegistrationStatus {
  Owner = 1,
  Registered,
  NonRegistered,
}

type ContestProblemDataType = {
  ID: number;
  Title: string;
};

export type ContestDataType = {
  contest_Id: number;
  title: string;
  start_time: number;
  duration: number;
  register_status: RegistrationStatus;
  problems: ContestProblemDataType[] | null;
};
