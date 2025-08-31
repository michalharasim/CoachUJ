import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Link, useNavigate} from "react-router-dom";
import React from 'react';
import { useAuth } from '@/contexts/auth-context';
import { authApi } from '@/lib/axios_instance'
import axios from "axios";

const LoginPage = () : React.ReactElement => {
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password.length < 8) {
            setIsError(true);
            return;
        }
        const data = {
            email,
            password,
        };

        try {
            const response = await authApi.post('/login', data);
            // logowanie, zapis tokenu do localStorage
            const jsonResponse : { token: string } = await response.data;
            login(jsonResponse.token);
            setIsError(false);
            setPassword('');
            setEmail('');
            navigate('/profile', { replace: true });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // czy odpowiedz serwera istnieje
                const responseData = error.response?.data;
                let errorMessage = 'Wystąpił nieznany błąd logowania.';
                if (responseData && typeof responseData === 'object' && 'error' in responseData) {
                    errorMessage = responseData.error;
                }
                alert(errorMessage);
            } else {
                console.error('Błąd sieci:', error);
                alert("Nie można połączyć się z serwerem.");
            }
        }
    };

    return (
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center font-bold text-2xl">Logowanie</CardTitle>
                    <CardDescription className="text-center">Wprowadź swój adres email i hasło poniżej</CardDescription>
                    {isError && <p className="text-destructive text-center">Wprowadzono błędne dane logowania</p>}
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Hasło</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button variant="default" type="submit" className="w-full font-semibold cursor-pointer text-foreground">Zaloguj się</Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Link to="/register" className="hover:underline text-sm cursor-pointer">
                        Nie masz jeszcze konta? Zarejestruj się!
                    </Link>
                </CardFooter>
            </Card>
    )
}


export default LoginPage;