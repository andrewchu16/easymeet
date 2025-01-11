import { useParams, useSearchParams } from "react-router-dom";
import MeetNotFound from "../MeetNotFound/MeetNotFound";

const checkMeetId = (meetId: string) => {
    return typeof meetId === "string";
};

const Share = () => {
    const { meetId } = useParams();
    const [searchParams] = useSearchParams();

    const isNew = searchParams.get("new") === "true";
    console.log(isNew);


    if (!meetId || !checkMeetId(meetId)) {
        return <MeetNotFound id={meetId} />;
    }

    return <div>Share meet {meetId}</div>;
};

export default Share;
