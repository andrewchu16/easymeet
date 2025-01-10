interface Timeslot {
    name: string;
    description: string;
}

interface TimeslotsEditProps {
    timeslots: Timeslot[];
    onTimeslotsChange: (timeslotDescriptions: Timeslot[]) => void;
}

const TimeslotsEdit = ({
    timeslots,
    onTimeslotsChange,
}: TimeslotsEditProps) => {
    return <div>TimeslotDescriptions</div>;
};

export default TimeslotsEdit;
export type { Timeslot };
