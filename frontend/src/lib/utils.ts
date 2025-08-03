import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {type DecodedToken, type Profile} from "@/lib/types";
import {jwtDecode} from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getName(user: Profile): string{
  if(user.name && user.surname){
    return user.name + " " + user.surname;
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

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
};
