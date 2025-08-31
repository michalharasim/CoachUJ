import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type {Message} from "@/lib/types";
import {trainerClientApi} from "@/lib/axios_instance";
import axios from "axios";

interface ChatInterfaceProps {
    currentUserId: number;
    conversationPartnerId: number;
    conversationPartnerName: string;
}

const ChatInterface  = ({
                                                         currentUserId,
                                                         conversationPartnerId,
                                                         conversationPartnerName,
                                                     }: ChatInterfaceProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessageContent, setNewMessageContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isInitialLoad = useRef(true);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const isOwnMessage = (message: Message) => {
        return message.senderID === currentUserId;
    }

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const response = await trainerClientApi.get('/messages', {
                params: {senderID: conversationPartnerId}
            });

            const data: Message[] = await response.data;
            const processedMessages = data.map(msg => ({
                ...msg,
                isOwnMessage: isOwnMessage(msg)
            }));

            setMessages(processedMessages);

            if (isInitialLoad.current && processedMessages.length > 0) {
                setTimeout(() => {
                    scrollToBottom();
                }, 100);
                isInitialLoad.current = false;
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                let errorMessage = 'An unknown fetch messages error occurred.';

                if (responseData && typeof responseData === 'object' && 'error' in responseData) {
                    errorMessage = responseData.error;
                }

                alert(errorMessage);
            } else {
                console.error('Network error:', error);
                alert("Cannot connect to the server.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!newMessageContent.trim()) {
            return;
        }
        setIsLoading(true);
        try {
            const response = await trainerClientApi.post('/messages',{
                receiverID: conversationPartnerId,
                content: newMessageContent.trim(),
            });
            
            const newMessage: Message = await response.data;
            setMessages(prevMessages => [...prevMessages, { ...newMessage, isOwnMessage: true }]);
            setNewMessageContent('');
            scrollToBottom();
        } catch (error) {
            // Check if the error is from Axios
            if (axios.isAxiosError(error)) {
                // Access the server's response data
                const responseData = error.response?.data;
                let errorMessage = 'An unknown send messages error occurred.';

                // Check if the response data is an object with an 'error' property
                if (responseData && typeof responseData === 'object' && 'error' in responseData) {
                    errorMessage = responseData.error;
                }

                alert(errorMessage);
            } else {
                console.error('Network error:', error);
                alert("Cannot connect to the server.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (conversationPartnerId) {
            fetchMessages();
            const interval = setInterval(fetchMessages, 5000); // Polling co 5 sekund
            return () => clearInterval(interval);
        }
    }, [conversationPartnerId]);


    return (
        <Card className="w-full max-h-full flex flex-col">
            <CardHeader className="p-4 border-b pb-0 pt-0">
                <CardTitle className="text-md md:text-xl font-semibold">Czat z {conversationPartnerName}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow p-4 overflow-auto">
                {isLoading && messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-gray-500">Ładowanie wiadomości...</div>
                ) : (
                    <ScrollArea className="h-full pr-2">
                        {messages.length === 0 && !isLoading ? (
                            <div className="text-sm md:text-md flex justify-center items-center text-muted-foreground">
                                {`Rozpocznij konwersację z ${conversationPartnerName}.`}
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-2">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${isOwnMessage(msg) ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[70%] p-2 rounded-lg shadow-sm ${
                                                isOwnMessage(msg)
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted text-muted-foreground'
                                            }`}
                                        >
                                            <p className="text-sm font-semibold mb-1">
                                                {isOwnMessage(msg) ? 'Ty' : conversationPartnerName}
                                            </p>
                                            <p className="text-sm">{msg.content}</p>
                                            <p className="text-xs text-right opacity-80 mt-1">
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </ScrollArea>
                )}
            </CardContent>
            <CardFooter className="flex items-center space-x-2 p-2 border-t pb-0">
                <Input
                    placeholder="Wpisz wiadomość..."
                    value={newMessageContent}
                    onChange={(e) => setNewMessageContent(e.target.value)}
                    disabled={isLoading}
                    className="text-sm md:text-md flex-grow"
                />
                <Button className="cursor-pointer" onClick={sendMessage} disabled={isLoading}>
                    Wyślij
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ChatInterface;