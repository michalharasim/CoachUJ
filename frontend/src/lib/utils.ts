import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {type Profile} from "@/lib/types";

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
