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

