import { useParams } from "react-router-dom";
import MeetNotFound from "../MeetNotFound/MeetNotFound";

const checkMeetId = (meetId: string) => {
    return typeof meetId === "string";
};

const Join = () => {
    const { meetId } = useParams();

    if (!meetId || !checkMeetId(meetId)) {
        return <MeetNotFound />;
    }

    return <div>Join meet {meetId}</div>;
};

export default Join;
