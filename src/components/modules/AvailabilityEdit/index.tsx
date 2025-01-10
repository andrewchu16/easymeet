interface TimeslotInfo {
    name: string;
    enabled: boolean;
}

interface Availability {
    date: Date;
    timeslots: TimeslotInfo[];
    enabled: boolean;
}
interface TimeslotEditProps {
    availability: Availability[];
    onAvailabilityChange: (timeslots: Availability[]) => void;
}

const AvailabilityEdit = ({ availability, onAvailabilityChange }: TimeslotEditProps) => {
    return (
        <div>
            <h1>Avaiability edit</h1>
            {availability.toString()}
        </div>
    );
};

export default AvailabilityEdit;
export type { Availability };
