import { MaterialSymbol } from "react-material-symbols";
import { Timeslot } from "../../../models/timeslot.model";

interface TimeslotsEditProps {
    timeslots: Timeslot[];
    onTimeslotsChange: (timeslotDescriptions: Timeslot[]) => void;
}

const TimeslotsEdit = ({
    timeslots,
    onTimeslotsChange,
}: TimeslotsEditProps) => {
    const handleDeleteTimeslot = (index: number) => {
        const newTimeslots = timeslots.slice();
        newTimeslots.splice(index, 1);
        onTimeslotsChange(newTimeslots);
    };

    const addTimeslot = () => {
        // Deny adding a new timeslot if the last timeslot is empty
        if (
            timeslots[timeslots.length - 1].name === "" &&
            timeslots[timeslots.length - 1].description === ""
        ) {
            return;
        }

        const newTimeslot: Timeslot = {
            name: "",
            description: "",
            id: (Math.random() + 1).toString(36).substring(7),
        };
        onTimeslotsChange([...timeslots, newTimeslot]);
    };

    return (
        <>
            <ul className="flex flex-col items-center gap-4 w-full text-dark">
                {timeslots.map((timeslot, index) => (
                    <li key={timeslot.id} className="flex gap-3 w-full">
                        <input
                            type="text"
                            placeholder="Name"
                            className="bg-lightgray p-2 rounded-xl w-full"
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
                            placeholder="Description"
                            className="bg-lightgray px-2 py-3 rounded-xl w-full"
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
                        <button
                            className="bg-red-200 rounded-xl p-3 flex items-center justify-center active:bg-red-400 transition-colors"
                            onClick={() => {
                                handleDeleteTimeslot(index);
                            }}
                        >
                            <MaterialSymbol
                                icon="delete"
                                className="text-dark"
                                size={22}
                            />
                        </button>
                    </li>
                ))}
            </ul>
            <button
                className="mt-0.5 rounded-full text-light bg-primary py-3 px-4 hover:brightness-110 active:brightness-110 transition-all flex items-center justify-center"
                onClick={addTimeslot}
            >
                <MaterialSymbol icon="add" size={22} /> Add timeslot
            </button>
        </>
    );
};

export default TimeslotsEdit;
