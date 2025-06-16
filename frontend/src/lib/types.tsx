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
    name: string;
    surname: string;
    location: string;
    phone: string;
    avatar: string;
    description: string;
}

export type WorkoutPlan = {
    id: string;
    name: string;
    date: string,
    author: Profile;
    exercises: WorkoutExercise[];
}

export type Exercise = {
    id: string;
    name: string;
    description: string;
    picture: string;
}

export type WorkoutExercise = {
    id: string;
    exercise: Exercise
    reps: number[];
    weight: number[];
    notes: string;
    order: number;
    breakTime: number;
}

export type WorkoutExerciseWithLog = {
    exercise: Exercise
    actualSets: number;
    actualReps: number[];
    actualWeight: number[];
    logNotes: string;
    actualBreakTime: number;
} & WorkoutExercise

export type Message = {
    id: string;
    sender: string;
    receiver:string;
    content: string;
    timestamp: string;
}

