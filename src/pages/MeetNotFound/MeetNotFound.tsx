import "@material-symbols/font-700";
import { Contact } from "../../components/modules";

interface MeetNotFoundProps {
    id: string | undefined;
}

const MeetNotFound = ({ id }: MeetNotFoundProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen absolute top-0 left-0 p-10 gap-2">
            <span className="font-bold text-primary mb-4 material-symbols-rounded select-none" style={{
                fontSize: 40
            }}>
                question_mark
            </span>
            <h1 className="text-dark text-center font-bold text-2xl">
                Meet Not Found
            </h1>
            <p className="text-body text-center">
                Meet{" "}
                <span className="text-dark">{id !== undefined ? id : ""}</span>{" "}
                could not be found. <Contact />
            </p>
        </div>
    );
};

export default MeetNotFound;
