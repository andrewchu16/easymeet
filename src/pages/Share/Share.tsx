import { useParams, useSearchParams } from "react-router-dom";
import MeetNotFound from "../MeetNotFound/MeetNotFound";
import { getMeetup } from "../../firebase/firebaseManager";
import { app } from "../../firebase/firebase";
import ConfettiExplosion from "react-confetti-explosion";
import "@material-symbols/font-500";
import "@material-symbols/font-700";
import { useEffect, useState } from "react";
import Meetup from "../../models/meetup.model";
import { Helmet } from "react-helmet";
import { ShareButton } from "../../components/modules";

const Share = () => {
    const { meetId } = useParams();
    const [searchParams] = useSearchParams();
    const [meetup, setMeetup] = useState<Meetup | null>(null);
    const [loading, setLoading] = useState(true);

    const isNew = searchParams.get("new") === "true";

    useEffect(() => {
        if (meetId) {
            getMeetup(app, meetId).then((meetup) => {
                setMeetup(meetup);
                setLoading(false);
            });
        }
    }, [meetId]);

    if (meetId === undefined || meetup === null) {
        return <>{!loading && <MeetNotFound id={meetId} />}</>;
    }

    const TITLE = `Share ${meetup.name} - EasyMeet`;
    const DESCRIPTION = `Share ${meetup.name} on EasyMeet!`;

    return (
        <>
            <Helmet>
                <title>{TITLE}</title>
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta name="description" content={DESCRIPTION} />
                <meta property="og:url" content="https://easymeet.ca" />
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="flex flex-col items-center justify-center h-screen w-screen absolute top-0 left-0 p-10 -z-10 gap-2">
                {isNew && (
                    <ConfettiExplosion
                        duration={2300}
                        force={0.6}
                        particleCount={80}
                        width={500}
                    />
                )}
                <span className="text-3xl">🥳🎊</span>
                <h1 className="text-dark text-center font-bold text-2xl">
                    "{meetup.name}" Created!
                </h1>
                <p className="text-body text-center">
                    Share this link with your friends to get started.
                </p>
                <ShareButton url={`https://easymeet.ca/join/${meetup.id}`} />
            </div>
        </>
    );
};

export default Share;
