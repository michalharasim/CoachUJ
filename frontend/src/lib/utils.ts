import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {type Profile} from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getName(user: Profile): string{
  if(user.givenName && user.surname){
    return user.givenName + " " + user.surname;
  }else{
    return user.username;
  }
}

export function formatSecondsToMinutesAndSeconds(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minutes}:${formattedSeconds}`;
}

export const transformBackendDataToForm = (backendData: any) => {
  const exercisesCount = backendData.exercises.length;
  const orderedArray = new Array(exercisesCount).fill(null);

  for (const ex of backendData.exercises) {
    orderedArray[ex.order] = {
      breakTime: ex.breakTime,
      exercise: {
        id: ex.exerciseID,
        name: ex.name,
      },
      reps: ex.repCount || "",
      weight: ex.weight || "",
    }
  }
  return {
    name: backendData.name,
    note: backendData.note || "",
    exercises: orderedArray,
  };
};
