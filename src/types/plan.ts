export type IPlanState = {
  planName: string;
  dateOfBirth: string;
  height: string;
  weight: string;
  weeklyActivities: string[];
  workoutGoal: string;
};

export type IWorkoutPlan = {
  title: string;
  content?: {
    day: string;
    exercises: string;
  }[];
  description?: string;
  type: 'plan' | 'note';
};

export type IPlan = {
  _id: string;
  planName: string;
  dateOfBirth: string;
  height: number;
  weight: number;
  weeklyActivities: string[];
  workoutGoal: string;
  workoutPlan: IWorkoutPlan[];
  createdAt: string;
  updatedAt: string;
};
