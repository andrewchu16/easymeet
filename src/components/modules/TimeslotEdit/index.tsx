interface Timeslot {
    date: Date;
    timeslots: string[];
    enabled: boolean;
}
interface TimeslotEditProps {
    timeslots: Timeslot[];
    onTimeslotsChange: (timeslots: Timeslot[]) => void;
}

const TimeslotEdit = ({ timeslots, onTimeslotsChange }: TimeslotEditProps) => {
    return (
        <div>
            <h1>TimeslotEdit</h1>
            {timeslots.toString()}
        </div>
    );
};

export default TimeslotEdit;
export type { Timeslot };
