import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type {Message} from "@/lib/types";

interface ChatInterfaceProps {
    currentUserId: string;
    currentUserName: string;
    conversationPartnerId: string;
    conversationPartnerName: string;
}

const ChatInterface  = ({
                                                         currentUserId,
                                                         currentUserName,
                                                         conversationPartnerId,
                                                         conversationPartnerName,
                                                     }: ChatInterfaceProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessageContent, setNewMessageContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const isOwnMessage = (message: Message) => {
        return message.sender === currentUserId;
    }

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const url = `/api/messages?conversationId=SMTH`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Message[] = await response.json();
            const processedMessages = data.map(msg => ({
                ...msg,
                isOwnMessage: msg.sender === currentUserId
            }));
            setMessages(processedMessages);
            scrollToBottom();
        } catch (error) {
            console.error("Błąd podczas pobierania wiadomości:", error);
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
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderId: currentUserId,
                    senderName: currentUserName,
                    receiverId: conversationPartnerId,
                    content: newMessageContent.trim(),
                    conversationId: "123",
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newMessage: Message = await response.json();
            setMessages(prevMessages => [...prevMessages, { ...newMessage, isOwnMessage: true }]);
            setNewMessageContent('');
            scrollToBottom();
        } catch (error) {
            console.error("Błąd podczas wysyłania wiadomości:", error);
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

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Card className="w-full h-full flex flex-col">
            <CardHeader className="p-4 border-b pb-0 pt-0">
                <CardTitle className="text-md md:text-xl font-semibold">Czat z {conversationPartnerName}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow p-4 overflow-hidden">
                {isLoading && messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-gray-500">Ładowanie wiadomości...</div>
                ) : (
                    <ScrollArea className="h-full pr-4">
                        {messages.length === 0 && !isLoading ? (
                            <div className="text-sm md:text-md flex justify-center items-center text-muted-foreground">
                                {`Rozpocznij konwersację z ${conversationPartnerName}.`}
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-3">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${isOwnMessage(msg) ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
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
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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