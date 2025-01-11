import "@material-symbols/font-400";
import { Timeslot } from "../../../models/timeslot.model";
import { getRandomId } from "../../../util/getRandomId";

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
            id: getRandomId(),
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
                            className="bg-red-200 rounded-xl p-3 flex items-center justify-center active:bg-red-400 transition-colors active:font-semibold"
                            onClick={() => {
                                handleDeleteTimeslot(index);
                            }}
                        >
                            <span className="material-symbols-rounded text-dark" style={{
                                fontSize: 22,
                            }}>delete</span>
                        </button>
                    </li>
                ))}
                <button
                    className="rounded-full text-dark active:font-semibold hover:brightness-110 active:brightness-110 transition-all flex items-center justify-center h-12"
                    onClick={addTimeslot}
                >
                    <span style={{ fontSize: 22}}>add</span>
                </button>
            </ul>
        </>
    );
};

export default TimeslotsEdit;
