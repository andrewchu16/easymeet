import { Timeslot } from "../../../models/timeslot.model";

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

