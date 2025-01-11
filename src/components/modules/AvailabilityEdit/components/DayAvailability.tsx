import { Availability } from "../../../../models/availability.model";
import TimeslotItem from "./TimeslotItem/TimeslotItem";

interface DayAvailabilityProps {
    availability: Availability;
    onAvailabilityChange: (availability: Availability) => void;
}

const DayAvailability = ({
    availability,
    onAvailabilityChange,
}: DayAvailabilityProps) => {
    const getReadableDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "short", day: "numeric" };
        let formattedDate = new Intl.DateTimeFormat("en-US", options).format(
            date
        );

        // Add a period to the abbreviated month, if not already present
        formattedDate = formattedDate.replace(
            /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/,
            "$1."
        );

        return formattedDate;
    };

    const handleTimeslotEnableChange = (enabled: boolean, timeslotInfoId: string) => {
        const newTimeslotInfo = availability.timeslots.map((info) => {
            if (info.id === timeslotInfoId) {
                return {
                    ...info,
                    enabled,
                };
            } 

            return info;
        });

        const newAvailability = {
            ...availability,
            timeslots: newTimeslotInfo,
        };

        onAvailabilityChange(newAvailability);
    };

    return (
        <li>
            <h2 key={availability.id} className="text-xl font-semibold text-dark mb-2">
                {getReadableDate(availability.date)}
            </h2>
            <ul className="flex flex-col gap-2">
                {availability.timeslots.map((info) => (
                    <TimeslotItem
                        info={info}
                        key={info.id}
                        onEnableChange={(enabled) => handleTimeslotEnableChange(enabled, info.id)}
                    />
                ))}
            </ul>
        </li>
    );
};

export default DayAvailability;
