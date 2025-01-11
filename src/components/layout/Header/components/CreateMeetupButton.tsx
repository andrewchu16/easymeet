import "./CreateMeetupButton.css";
import { Link } from "react-router-dom";
import '@material-symbols/font-400';

const CreateMeetupButton = () => {
    
    return (
        <>
            <Link className="text-white px-5 py-3 rounded-3xl bg-create-meetup-button text-lg flex items-center gap-2 justify-center w-fit m-auto active:brightness-90" to="/">
                <span className="text-[24px] text-light material-symbols-rounded select-none">add</span>
                Create Meetup
            </Link>
        </>
    );
};

export default CreateMeetupButton;
