import "@material-symbols/font-700";
import { useState } from "react";

interface NameInputProps {
    onNameChange: (name: string) => void;
}

const NameInput = ({ onNameChange }: NameInputProps) => {
    const [name, setName] = useState("");
    return (
        <span className="flex gap-2">
            <span className="flex items-center bg-lightgray px-2 py-1 rounded-xl">
                <span className="material-symbols-rounded text-body">
                    person
                </span>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Display Name"
                    className="w-full p-2 text-body  bg-lightgray focus:outline-none"
                />
            </span>
            <button
                className="bg-primary px-5 text-light font-semibold py-1 rounded-xl active:brightness-90"
                onClick={() => {
                    if (name !== "") onNameChange(name);
                }}
            >
                Set
            </button>
        </span>
    );
};

export default NameInput;
