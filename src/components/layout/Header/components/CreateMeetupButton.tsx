import "./CreateMeetupButton.css";
import { Link } from "react-router-dom";
import { MaterialSymbol } from "react-material-symbols";

const CreateMeetupButton = () => {
    
    return (
        <>
            <Link className="bg-red-500 text-white px-5 py-3 rounded-3xl bg-create-meetup-button text-lg flex items-center gap-2 justify-center w-fit m-auto" to="/">
                <MaterialSymbol icon="add" size={24} fill color="white" />
                Create Meetup
            </Link>
        </>
    );
};

export default CreateMeetupButton;
