import UsersBar from "@/components/messages/UsersBar";
import {useState} from "react";
import type {Profile} from "@/lib/types";
import ChatInterface from "@/components/messages/ChatInterface";
import {getName} from "@/lib/utils";
import {useAuth} from "@/contexts/auth-context";

const MessagesPage = () => {
    const [selectedUser, setSelectedUser] = useState<(Profile & { userID: number}) | null>(null);
    const { userData, isLoading } = useAuth();

    if (isLoading) {
        return <div className="text-center p-6">Ładowanie...</div>;
    }
    if (!userData) {
        return <div className="text-center p-6 text-red-500">Błąd: Użytkownik niezalogowany.</div>;
    }

    return (
        <div className="flex flex-row w-full h-full">
            <UsersBar setSelectedUser={setSelectedUser}/>
            <div className="flex-1 p-1 md:p-10 h-full flex items-center justify-center">
                {selectedUser ? (
                    <ChatInterface
                        currentUserId={userData.id}
                        conversationPartnerId={selectedUser.userID}
                        conversationPartnerName={getName(selectedUser)}
                    />
                ) : (
                    <div className="text-center text-muted-foreground">
                        Wybierz użytkownika z listy, aby rozpocząć czat.
                    </div>
                )}
            </div>
        </div>
    )
}

export default MessagesPage;