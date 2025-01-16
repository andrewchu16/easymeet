import Meetup from "../../../models/meetup.model";
import Participant from "../../../models/participant.model";
import getReadableDate from "../../../util/getReadableDate";
import DayAvailability from "./components/DayAvailability";

interface AvailabilityViewProps {
    participants: Participant[];
    participant: Participant;
    meetup: Meetup;
    onParticipantChange: (newParticipant: Participant) => void;
}

const AvailabilityView = ({
    participants,
    participant,
    meetup,
    onParticipantChange,
}: AvailabilityViewProps) => {
    const setEnableAll = (enabled: boolean) => {
        const newAvailability = {
            ...participant.availability,
        };

        meetup.availability.forEach((availValue) => {
            const date = availValue.date;
            const timeslotNames = availValue.timeslots.map(
                (timeslot) => timeslot.name
            );

            if (enabled) {
                newAvailability[getReadableDate(date)] = timeslotNames;
            } else {
                delete newAvailability[getReadableDate(date)];
            }
        });

        const newParticipant = {
            ...participant,
            availability: newAvailability,
        };

        onParticipantChange(newParticipant);
    };

    return (
        <>
            <div className="text-dark flex gap-2 justify-center mt-1 mb-3">
                <button
                    className="font-semibold active:font-bold shadow-md bg-light active:brightness-95 transition-all duration-75 text-body px-2 py-1 rounded-lg"
                    onClick={() => setEnableAll(true)}
                >
                    Select all
                </button>
                <button
                    className="font-semibold active:font-bold shadow-md bg-light active:brightness-95 transition-all duration-75 text-body px-2 py-1 rounded-lg"
                    onClick={() => setEnableAll(false)}
                >
                    Deselect all
                </button>
            </div>
            <ul className="flex flex-col gap-3 w-full">
                {meetup.availability.map((availValue) => (
                    <DayAvailability
                        availability={availValue}
                        participants={participants}
                        participant={participant}
                        key={availValue.id}
                        onParticipantChange={onParticipantChange}
                    />
                ))}
            </ul>
        </>
    );
};

export default AvailabilityView;
