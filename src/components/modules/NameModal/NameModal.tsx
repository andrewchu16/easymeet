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
            className={`px-10 py-8 rounded-xl flex flex-col gap-1 items-center backdrop:bg-dark/60 ${
                show ? "" : "hidden"
            }`}
            onKeyDown={(e) => {
                if (e.key === "Escape") {
                    setShow(false);
                    e.stopPropagation();
                }
            }}
        >
            <h1 className="text-dark text-lg font-semibold">Set display name for this meeting</h1>
            <p className="text-body mb-4">This name will only be used for this meeting.</p>
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
