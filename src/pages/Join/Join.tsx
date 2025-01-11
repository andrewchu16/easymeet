import { useParams } from "react-router-dom";
import MeetNotFound from "../MeetNotFound/MeetNotFound";
import { getMeetup } from "../../firebase/firebaseManager";
import { app } from "../../firebase/firebase";
import "@material-symbols/font-500";
import { useEffect, useState } from "react";
import Meetup from "../../models/meetup.model";
import { Helmet } from "react-helmet";

const Join = () => {
    const { meetId } = useParams();
    const [meetup, setMeetup] = useState<Meetup | null>(null);
    const [loading, setLoading] = useState(true);
    const [justCopied, setJustCopied] = useState(false);

    useEffect(() => {
        if (meetId) {
            getMeetup(app, meetId).then((meetup) => {
                setMeetup(meetup);
                setLoading(false);
            });
        }
    }, [meetId]);

    if (meetId === undefined || meetup === null) {
        return <>({!loading && <MeetNotFound id={meetId} />})</>;
    }

    const copyShareLink = () => {
        const shareLink = document.getElementById("share-link");
        if (shareLink) {
            navigator.clipboard.writeText(shareLink.textContent || "");
        }
    };

    const TITLE = `Join ${meetup.name} - EasyMeet`;
    const DESCRIPTION = `Join ${meetup.name} on EasyMeet!`;

    return (
        <>
            <Helmet>
                <title>{TITLE}</title>
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="description" content={DESCRIPTION} />
                <meta property="og:url" content="https://easymeet.ca" />
            </Helmet>
            <div>Join meet {meetup.name}</div>;
        </>
    );
};

export default Join;
