import { useParams } from "react-router-dom";
import MeetNotFound from "../MeetNotFound/MeetNotFound";
import { getMeetup } from "../../firebase/firebaseManager";
import { app } from "../../firebase/firebase";
import "@material-symbols/font-500";
import { useEffect, useState } from "react";
import Meetup from "../../models/meetup.model";
import { Helmet } from "react-helmet";
import {
    AvailabilityView,
    MeetupTitle,
    NameModal,
    TimeslotsView,
} from "../../components/modules";
import Participant from "../../models/participant.model";

const Join = () => {
    const { meetId } = useParams();
    const [meetup, setMeetup] = useState<Meetup | null>(null);
    const [loading, setLoading] = useState(true);
    const [participant, setParticipant] = useState<Participant>({
        name: "",
        createdAt: new Date(0),
        availability: {} as Record<string, string[]>,
    });

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

    const TITLE = `Join ${meetup.name} - EasyMeet`;
    const DESCRIPTION = `Join ${meetup.name} on EasyMeet!`;

    return (
        <>
            <NameModal
                handleNameChange={(name) => {
                    setParticipant({ ...participant, name });
                    console.log(name);
                }}
            />
            <Helmet>
                <title>{TITLE}</title>
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="description" content={DESCRIPTION} />
                <meta property="og:url" content="https://easymeet.ca" />
                <meta name="robots" content="noindex" />
            </Helmet>
            <main className="flex flex-col items-center gap-2">
                <section className="flex justify-center items-center my-4">
                    <MeetupTitle
                        editable={false}
                        handleChange={() => null}
                        title={meetup.name}
                    />
                </section>

                <section className="py-7 px-4 flex flex-col gap-2 bg-lightgray w-full rounded-t-[40px]">
                    <section className="flex items-center flex-col gap-1">
                        <h2 className="text-lg text-body text-center">
                            Timeslot Descriptions
                        </h2>
                        <TimeslotsView timeslots={meetup.timeslots} />
                    </section>
                    <section className="flex items-center  flex-col gap-1">
                        <h2 className="text-lg text-body text-center">
                            Timeslots Available
                        </h2>
                        <AvailabilityView />
                    </section>
                </section>
            </main>
        </>
    );
};

export default Join;
