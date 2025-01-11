import "@material-symbols/font-700";

interface NameInputProps {
    name: string;
    onNameChange: (name: string) => void;
}

const NameInput = ({ name, onNameChange }: NameInputProps) => {
    return (
        <span className="flex items-center bg-lightgray px-2 py-1 rounded-xl">
            <span className="material-symbols-rounded text-body">person</span>
            <input
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Display Name"
                className="w-full p-2 text-body  bg-lightgray focus:outline-none"
            />
        </span>
    );
};

export default NameInput;
