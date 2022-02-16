export interface ContentI {
  text: string;
  visible: boolean;
  status: string;
}

export interface TaskI {
  _id: string;
  number: number | undefined;
  task: string;
  completed: boolean;
}

export interface MessageI {
  text: string;
  status: string;
  visible: boolean;
}
