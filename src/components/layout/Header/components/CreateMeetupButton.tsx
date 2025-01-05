import "./CreateMeetupButton.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const CreateMeetupButton = () => {
    
    return (
        <>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=add"
                />
            </Helmet>
            <Link className="bg-red-500 text-white px-5 py-3 rounded-3xl bg-create-meetup-button text-lg flex items-center justify-center w-fit m-auto" to="/">
                <span className="material-symbols-rounded">add</span>
                Create Meetup
            </Link>
        </>
    );
};

export default CreateMeetupButton;
