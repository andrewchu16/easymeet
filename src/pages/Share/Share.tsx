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

const Share = () => {
    const { meetId } = useParams();
    const [searchParams] = useSearchParams();
    const [meetup, setMeetup] = useState<Meetup | null>(null);
    const [loading, setLoading] = useState(true);
    const [justCopied, setJustCopied] = useState(false);

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

    const copyShareLink = () => {
        const shareLink = document.getElementById("share-link");
        if (shareLink) {
            navigator.clipboard.writeText(shareLink.textContent || "");
        }
    };

    const TITLE = `Share ${meetup.name} - EasyMeet`;
    const DESCRIPTION = `Share ${meetup.name} on EasyMeet!`;

    return (
        <>
            <Helmet>
                <title>{TITLE}</title>
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="description" content={DESCRIPTION} />
                <meta property="og:url" content="https://easymeet.ca" />
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
                <span className="text-body flex items-center gap-3 bg-light shadow-md px-4 py-3 rounded-lg">
                    <a
                        href={`https://easymeet.ca/join/${meetId}`}
                        className="underline hover:font-semibold active:font-semibold"
                        id="share-link"
                    >
                        https://easymeet.ca/join/{meetId}
                    </a>
                    <span
                        onClick={() => {
                            if (!justCopied) {
                                copyShareLink();
                                setJustCopied(true);
                                setTimeout(() => {
                                    setJustCopied(false);
                                }, 1000);
                            }
                        }}
                        className={`select-none hover:font-bold ${
                            justCopied
                                ? "font-semibold"
                                : "material-symbols-rounded"
                        }`}
                    >
                        {justCopied ? "Copied!" : "content_copy"}
                    </span>
                </span>
            </div>
            {/* pre-render bold icon */}
            <span
                className="absoslute opacity-0 material-symbols-rounded"
                style={{
                    fontWeight: 700,
                }}
            >
                content_copy
            </span>
        </>
    );
};

export default Share;
