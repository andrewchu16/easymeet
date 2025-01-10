
interface Timeslot {
    name: string;
    description: string;
}

const defaultTimeslots = [
    {
        name: "Morning",
        description: "9am - 12pm",
    },
    {
        name: "Afternoon",
        description: "12pm - 3pm",
    },
    {
        name: "Evening",
        description: "3pm - 6pm",
    },
    {
        name: "Night",
        description: "6pm - 9pm",
    }
];

interface TimeslotsEditProps {
    timeslots: Timeslot[];
    onTimeslotsChange: (timeslotDescriptions: Timeslot[]) => void;
}

const TimeslotsEdit = ({
    timeslots,
    onTimeslotsChange,
}: TimeslotsEditProps) => {
    return <ul>
        {timeslots.map((timeslot, index) => (
            <li key={index}>
                <input
                    type="text"
                    value={timeslot.name}
                    onChange={(event) => {
                        const newTimeslots = timeslots.slice();
                        newTimeslots[index] = {
                            ...timeslot,
                            name: event.target.value,
                        };
                        onTimeslotsChange(newTimeslots);
                    }}
                />
                <input
                    type="text"
                    value={timeslot.description}
                    onChange={(event) => {
                        const newTimeslots = timeslots.slice();
                        newTimeslots[index] = {
                            ...timeslot,
                            description: event.target.value,
                        };
                        onTimeslotsChange(newTimeslots);
                    }}
                />
            </li>
        ))}
    </ul>;
};

export default TimeslotsEdit;
export type { Timeslot };
export { defaultTimeslots };
