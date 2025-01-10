import { useParams } from "react-router-dom";
import MeetNotFound from "../MeetNotFound/MeetNotFound";

const checkMeetId = (meetId: string) => {
    return typeof meetId === "string";
};

const Share = () => {
    const { meetId } = useParams();

    if (!meetId || !checkMeetId(meetId)) {
        return <MeetNotFound />;
    }

    return <div>Share meet {meetId}</div>;
};

export default Share;
