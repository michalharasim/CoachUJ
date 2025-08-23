import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import type {Profile} from "@/lib/types";
import ProfileCard from "@/components/ProfileCard";

type SelectUserModalProps = {
    isOpen: boolean;
    users: Profile[];
    onClose: () => void;
    onSave: (username: string) => void;
};

const SelectUserModal = ({isOpen, onClose, onSave, users} : SelectUserModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] max-h-screen md:max-w-xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Wybierz użytkownika</DialogTitle>
                </DialogHeader>
                {users.map((user) => (
                    <div key={user.username} className="flex flex-col gap-2">
                        <ProfileCard
                        username={user.username}
                        givenName={user.givenName}
                        surname={user.surname}
                        location={""}
                        phone={""}
                        picture={user.picture}
                        description={""}
                        buttonText="Wybierz"
                        OnClick={() => onSave(user.username)}/>
                    </div>
                ))}
            </DialogContent>
        </Dialog>
    );
}

export default SelectUserModal;