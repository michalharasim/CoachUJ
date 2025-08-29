export type User = {
    username: string,
    email: string,
    picture?: string,
    givenName? :string,
    surname?: string,
    description?: string,
    location?: string,
    phone? : string,
    isCoach: boolean,
}

export type Profile= {
    username: string;
    givenName: string;
    surname: string;
    location: string;
    phone: string;
    picture: string;
    description: string;
}

export type WorkoutPlan = {
    id: number;
    name: string;
    date: string,
    author: Profile | null;
    exercises: WorkoutExercise[];
    note: string;
}

export type ExerciseCategory = {
    id: number;
    name: string;
}

export type Exercise = {
    id: number;
    name: string;
    description: string;
    categories: ExerciseCategory[];
    isMyExercise: boolean;
    picture: string;
}

export type WorkoutExercise = {
    exercise: Exercise
    reps: string[];
    weight: number[];
    breakTime: number;
}

export type WorkoutLog = {
    plan: WorkoutPlan;
    log_exercises: WorkoutExerciseWithLog[];
    log_note: string;
}

export type WorkoutExerciseWithLog = {
    actualReps: string[];
    actualWeight: number[];
    actualBreakTime: number[];
}

export type Message = {
    id: string;
    senderID: number;
    receiverID: number;
    content: string;
    createdAt: string;
}

export interface UserNavProfileData {
    id: number;
    username: string;
    isCoach: boolean;
    email: string;
    picture: string;
}

export type AuthContextType = {
    userData: UserNavProfileData | null;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
    setUserData: (
        data: UserNavProfileData | null | ((prev: UserNavProfileData | null) => UserNavProfileData | null)
    ) => void;
}

