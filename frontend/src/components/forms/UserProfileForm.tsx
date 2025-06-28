import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { userProfileSchema, type UserProfileFormValues } from '@/lib/schemas/UserSchema';
import type { User } from '@/lib/types';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import { Textarea } from '../ui/textarea';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useEffect, useState} from "react";
import {AvatarFallBackImage} from "@/lib/tsx_utils";

type UserProfileFormProps = {
    currentUser: User;
    onSubmit: (userProfileData: UserProfileFormValues) => void;
    isLoading: boolean;
};

const UserProfileForm = ({ currentUser, onSubmit, isLoading } : UserProfileFormProps) => {
    const form  = useForm<UserProfileFormValues>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: {
            email: currentUser.email,
            username: currentUser.username,
            givenName: currentUser.givenName || '',
            surname: currentUser.surname || '',
            phone: currentUser.phone || '',
            description: currentUser.description || '',
            location: currentUser.location ||  '',
            profilePicture: null,
        },
        mode: 'onBlur',
    });
    const profilePictureFromForm = form.watch("profilePicture");
    const [displayImageUrl, setDisplayImageUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (profilePictureFromForm instanceof File) {
            const url = URL.createObjectURL(profilePictureFromForm);
            setDisplayImageUrl(url);
            return () => {
                URL.revokeObjectURL(url);
            };
        } else if (currentUser.picture) {
            setDisplayImageUrl(currentUser.picture);
        } else {
            setDisplayImageUrl(undefined);
        }
    }, [profilePictureFromForm, currentUser.picture]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={ "grid flex-col gap-4"}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    <div className="flex flex-row items-center gap-1">
                        <Avatar className="w-[100px] h-[100px]">
                            <AvatarImage src={displayImageUrl}/>
                            <AvatarFallback className="bg-accent">
                                {AvatarFallBackImage()}
                            </AvatarFallback>
                        </Avatar>
                        <p className="text-muted-foreground">@{currentUser.username}</p>
                    </div>
                    <FormField
                        control={form.control}
                        name="profilePicture"
                        render={({ field: { onChange, value, ...fieldProps } }) => (
                            <FormItem>
                                <FormLabel>Zmień Avatar</FormLabel>
                                <FormControl>
                                    <Input
                                        name={fieldProps.name}
                                        onBlur={fieldProps.onBlur}
                                        ref={fieldProps.ref}
                                        className="cursor-pointer"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            form.setValue("profilePicture", file, { shouldValidate: true });
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Nazwa Użytkownika</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="givenName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Imię</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="surname"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Nazwisko</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Adres</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Numer Telefonu</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Opis Profilu</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Opowiedz o sobie"
                                    {...field}
                                    className="w-full h-[200px] resize-none"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            <Button type="submit" disabled={isLoading} className="cursor-pointer" size="lg">
                {isLoading ? "Zapisywanie..." : "Zapisz zmiany"}
            </Button>
            </form>
        </Form>
    );
};

export default UserProfileForm;