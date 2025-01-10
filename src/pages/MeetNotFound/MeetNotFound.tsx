import { MaterialSymbol } from "react-material-symbols";
import { Contact } from "../../components/modules";

interface MeetNotFoundProps {
    id: string;
}

const MeetNotFound = ({ id }: MeetNotFoundProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen absolute top-0 left-0 p-10 gap-2">
            <MaterialSymbol icon="question_mark" size={40} className="text-primary mb-4" weight={900} />
            <h1 className="text-dark text-center font-bold text-2xl">Meet Not Found</h1>
            <p className="text-body text-center">
                Meet <span className="text-dark">{id}</span> could not be found. <Contact />
            </p>
        </div>
    );
};

export default MeetNotFound;
