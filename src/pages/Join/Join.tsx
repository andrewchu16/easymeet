import { useParams } from "react-router-dom";
import MeetNotFound from "../MeetNotFound/MeetNotFound";
import {
    createParticipant,
    getMeetup,
    getParticipants,
    updateParticipant,
} from "../../firebase/firebaseManager";
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
    const [participant, setParticipant] = useState<Participant | null>(null);
    const [participantId, setParticipantId] = useState("");
    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {
        if (meetId) {
            getMeetup(app, meetId).then((meetup) => {
                meetup?.availability.sort(
                    (a, b) => a.date.getTime() - b.date.getTime()
                );
                setMeetup(meetup);

                if (meetup !== null) {
                    getParticipants(app, meetup).then((participants) => {
                        setParticipants(participants);
                    });
                }
                setLoading(false);
            });
        }
    }, [meetId]);

    if (meetId === undefined || meetup === null) {
        return <>({!loading && <MeetNotFound id={meetId} />})</>;
    }

    const setName = async (name: string) => {
        const pData = await createParticipant(app, meetup, name);

        if (pData.isNew) {
            setParticipants([...participants, pData.participant]);
        }
        setParticipantId(pData.participantId);
        setParticipant(pData.participant);
    };

    const handleParticipantChange = async (newParticipant: Participant) => {
        console.log(newParticipant);
        setParticipant(newParticipant);
        setParticipants(
            participants.map((p) =>
                p.name === newParticipant.name ? newParticipant : p
            )
        );
        await updateParticipant(app, participantId, newParticipant, meetup.id);
    };

    const TITLE = `Join ${meetup.name} - EasyMeet`;
    const DESCRIPTION = `Join ${meetup.name} on EasyMeet!`;

    return (
        <>
            <NameModal handleNameChange={setName} />
            <Helmet>
                <title>{TITLE}</title>
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta name="description" content={DESCRIPTION} />
                <meta property="og:url" content="https://easymeet.ca" />
                <meta name="robots" content="noindex" />
            </Helmet>
            <main className="flex flex-col px-4 items-center gap-2">
                <section className="flex justify-center items-center my-4">
                    <MeetupTitle
                        editable={false}
                        handleChange={() => null}
                        title={meetup.name}
                    />
                </section>

                <section className="py-7 px-4 flex flex-col gap-2 bg-lightgray w-full rounded-t-[40px] max-w-[500px]">
                    <section className="flex flex-col gap-1">
                        <h2 className="text-lg text-body text-center">
                            Timeslot Descriptions
                        </h2>
                        <TimeslotsView timeslots={meetup.timeslots} />
                    </section>
                    <section className="flex items-center  flex-col gap-1">
                        <h2 className="text-lg text-body text-center">
                            Timeslots Available
                        </h2>
                        {meetup !== null && (
                            <AvailabilityView
                                participants={participants}
                                participant={participant!}
                                meetup={meetup}
                                onParticipantChange={handleParticipantChange}
                            />
                        )}
                    </section>
                </section>
            </main>
        </>
    );
};

export default Join;
