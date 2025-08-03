import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import React from 'react';
import {Checkbox} from "@/components/ui/checkbox";
import {useNavigate} from "react-router-dom";
import {authApi} from "@/lib/axios_instance";
import axios from "axios";

const RegisterPage = () : React.ReactElement => {
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);
    const [isPassword2Visible, setIsPassword2Visible] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [isCoachAccount, setIsCoachAccount] = useState<boolean>(false);
    const MinPasswordLength = 8;
    const navigate = useNavigate();

    const validatePasswordLength = () => {
        if (password.length > 0 && password.length < MinPasswordLength) {
            setPasswordError("Hasło musi mieć co najmniej 8 znaków.");
        } else {
            setPasswordError(null);
        }
    };

    const validatePasswordMatch = () => {
        if (password2.length > 0 && password !== password2) {
            setPasswordMatchError("Hasła nie pasują do siebie.");
        } else {
            setPasswordMatchError(null);
        }
    };

    const validateUsername = () => {
        if (username.length > 2 && username.length <= 50){
            setUsernameError(null);
        }else{
            setUsernameError("Nazwa użytkownika musi mieć od 3 do 50 znaków.")
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        validatePasswordLength();
        validatePasswordMatch();
        validateUsername();

        if (passwordError || usernameError || passwordMatchError) {
            return;
        }

        const data = {
            email,
            username,
            password,
            isCoach: isCoachAccount
        };

        try {
            await authApi.post('/register', data);
            alert("Rejestracja pomyślna!");
            setIsCoachAccount(false);
            setPasswordError(null);
            setPasswordMatchError(null);
            setUsernameError(null);
            navigate('/login');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                let errorMessage = 'Wystąpił nieznany błąd rejestracji.';

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
                <CardTitle className="text-center font-bold text-2xl">Rejestracja</CardTitle>
                <CardDescription className="text-center">Wprowadź swój adres email i hasło poniżej</CardDescription>
                {(passwordError || passwordMatchError) && (
                    <p className="text-destructive text-sm mt-2 text-center">
                        Proszę poprawić błędy w formularzu.
                    </p>
                )}
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid">
                            <div className="flex flex-row items-center gap-2">
                                <Checkbox
                                    className="w-5 h-5"
                                    id="isCoach"
                                    checked={isCoachAccount}
                                    onCheckedChange={(checked) => setIsCoachAccount(checked as boolean)}
                                />
                                <Label htmlFor="isCoach">Konto Trenera</Label>
                            </div>
                            <span className="text-sm text-muted-foreground">Zaznaczając checkbox rejestrujesz konto jako Trener. Niezaznaczony oznacza konto klienta.</span>
                        </div>
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
                            <Label htmlFor="username">Nazwa Użytkownika</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="username"
                                required
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    validateUsername();
                                }}
                                onBlur={validateUsername}
                            />
                            {usernameError && (
                                <p className="text-destructive text-xs mt-1">{usernameError}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Hasło</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setIsPassword2Visible(e.target.value.length >= MinPasswordLength);
                                }}
                                onBlur={validatePasswordLength}
                            />
                            {passwordError && (
                                <p className="text-destructive text-xs mt-1">{passwordError}</p>
                            )}
                        </div>
                        { isPassword2Visible && (
                            <div className="grid gap-2">
                                <Label htmlFor="password2">Powtórz hasło</Label>
                                <Input
                                    id="password2"
                                    type="password"
                                    required
                                    value={password2}
                                    onChange={(e) => {
                                        setPassword2(e.target.value);
                                        if (e.target.value.length > 0) validatePasswordMatch();
                                    }}
                                    onBlur={validatePasswordMatch}
                                />
                                {passwordMatchError && (
                                    <p className="text-destructive text-xs mt-1">{passwordMatchError}</p>
                                )}
                            </div>
                        )}
                        <Button type="submit" className="w-full font-semibold cursor-pointer text-foreground">Zarejestruj się</Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Link to="/login" className="hover:underline text-sm cursor-pointer">
                    Masz już konta? Zaloguj się!
                </Link>
            </CardFooter>
        </Card>
    )
}


export default RegisterPage;