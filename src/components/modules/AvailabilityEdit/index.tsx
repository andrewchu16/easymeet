import { Availability } from "../../../models/availability.model";

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