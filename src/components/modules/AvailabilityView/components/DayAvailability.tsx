import { Availability } from "../../../../models/availability.model";
import Participant from "../../../../models/participant.model";
import getReadableDate from "../../../../util/getReadableDate";
import TimeslotItem from "./TimeslotItem/TimeslotItem";

interface DayAvailabilityProps {
    participants: Participant[];
    participant: Participant;
    onParticipantChange: (newParticipant: Participant) => void;
    availability: Availability;
}

const DayAvailability = ({
    participants,
    availability,
    participant,
    onParticipantChange,
}: DayAvailabilityProps) => {
    const handleEnableChange = (enabled: boolean, timeslotName: string) => {
        let newAvailability = {
            ...participant.availability,
        };

        if (!enabled) {
            newAvailability = Object.entries(newAvailability).reduce(
                (acc, [date, timeslotNames]) => {
                    if (date === getReadableDate(availability.date)) {
                        acc[date] = timeslotNames.filter(
                            (name) => name !== timeslotName
                        );
                    } else {
                        acc[date] = timeslotNames;
                    }

                    return acc;
                },
                {} as Record<string, string[]>
            );
        } else {
            if (!newAvailability[getReadableDate(availability.date)]) {
                newAvailability[getReadableDate(availability.date)] = [];
            }

            newAvailability = Object.entries(newAvailability).reduce(
                (acc, [date, timeslotNames]) => {
                    if (date === getReadableDate(availability.date)) {
                        acc[date] = [...timeslotNames, timeslotName];
                    } else {
                        acc[date] = timeslotNames;
                    }

                    return acc;
                },
                {} as Record<string, string[]>
            );
        }

        const newParticipant = {
            ...participant,
            availability: newAvailability,
        };

        onParticipantChange(newParticipant);
    };

    return (
        <li>
            <h2
                key={availability.id}
                className="text-base font-semibold text-body mb-1"
            >
                {getReadableDate(availability.date)}
            </h2>
            <ul className="flex flex-col gap-1.5">
                {availability.timeslots.map((info) => (
                    <TimeslotItem
                        timeslotName={info.name}
                        date={availability.date}
                        participants={participants}
                        key={info.id}
                        enabled={
                            participant !== null &&
                            Object.entries(participant.availability).some(
                                ([date, timeslotNames]) => {
                                    return (
                                        date ===
                                            getReadableDate(
                                                availability.date
                                            ) &&
                                        timeslotNames.includes(info.name)
                                    );
                                }
                            )
                        }
                        onEnableChange={(enabled) =>
                            handleEnableChange(enabled, info.name)
                        }
                    />
                ))}
            </ul>
        </li>
    );
};

export default DayAvailability;
