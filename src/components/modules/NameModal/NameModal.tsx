import { useEffect, useRef, useState } from "react";
import NameInput from "../NameInput/NameInput";

interface NameModalProps {
    handleNameChange: (name: string) => void;
}

const NameModal = ({ handleNameChange }: NameModalProps) => {
    const [show, setShow] = useState(true);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    return (
        <dialog
            ref={dialogRef}
            className={`px-6 py-5 rounded-xl flex flex-col gap-1 backdrop:bg-dark/60 ${
                show ? "" : "hidden"
            }`}
        >
            <h1 className="text-body">Set display name for this meeting</h1>
            <NameInput
                onNameChange={(name) => {
                    handleNameChange(name.trim());
                    if (name !== "") {
                        dialogRef.current?.close();
                        setShow(false);
                    }
                }}
            />
        </dialog>
    );
};

export default NameModal;
