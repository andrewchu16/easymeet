interface TimeslotEditProps {
    timeslots: Map<string, string[]>;
    setTimeslots: (timeslots: Map<string, string[]>) => void;
}

const TimeslotEdit = ({ timeslots, setTimeslots }: TimeslotEditProps) => {
    return (
        <div>
            <h1>TimeslotEdit</h1>
            {timeslots}
        </div>
    );
};

export default TimeslotEdit;
