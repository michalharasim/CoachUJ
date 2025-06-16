import UsersBar from "@/components/messages/UsersBar";
import {useState} from "react";
import type {Profile} from "@/lib/types";
import ChatInterface from "@/components/messages/ChatInterface";
import {getName} from "@/lib/utils";

const MessagesPage = () => {
    const [selectedUser, setSelectedUser] = useState<Profile | null>(null);

    return (
        <div className="flex flex-row w-full h-full">
            <UsersBar setSelectedUser={setSelectedUser}/>
            <div className="flex-1 p-1 md:p-10 h-full flex items-center justify-center">
                {selectedUser ? (
                    <ChatInterface
                        currentUserId={"0"}
                        currentUserName={"User1"}
                        conversationPartnerId={selectedUser.username}
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