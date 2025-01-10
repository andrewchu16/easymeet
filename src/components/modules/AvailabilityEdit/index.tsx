import { Availability } from "../../../models/availability.model";

interface TimeslotEditProps {
    availability: Availability[];
    onAvailabilityChange: (timeslots: Availability[]) => void;
}

const AvailabilityEdit = ({
    availability,
    onAvailabilityChange,
}: TimeslotEditProps) => {
    const enabledAvailabilities = availability.filter((availValue) => availValue.enabled);

    const getReadableDate = (date: Date) => {
        // Monday, Jan. 1
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
        });
    }

    return (
        <div className="flex flex-col gap-4">
            {enabledAvailabilities.map((availValue, index) => (
                <h2 key={availValue.id} className="font-bold text-lg">{getReadableDate(availValue.date)}</h2>
            ))}
        </div>
    );
};

export default AvailabilityEdit;
