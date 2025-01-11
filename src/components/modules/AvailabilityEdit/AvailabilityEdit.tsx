import { Availability } from "../../../models/availability.model";
import DayAvailability from "./components/DayAvailability";

interface TimeslotEditProps {
    availability: Availability[];
    onAvailabilityChange: (timeslots: Availability[]) => void;
}

const AvailabilityEdit = ({
    availability,
    onAvailabilityChange,
}: TimeslotEditProps) => {
    const enabledAvailabilities = availability.filter(
        (availValue) => availValue.enabled
    );

    const setEnableAll = (isEnabled: boolean) => {
        const newAvailabilities = availability.map((availValue) => {
            const newTimeslotInfo = availValue.timeslots.map((info) => ({
                ...info,
                enabled: isEnabled,
            }));

            return {
                ...availValue,
                timeslots: newTimeslotInfo,
            };
        });
        onAvailabilityChange(newAvailabilities);
    };

    return (
        <>
            <div className="text-dark flex gap-2 justify-center mb-0.5">
                <button
                    className="font-semibold active:font-bold shadow-md bg-light active:brightness-95 transition-all duration-75 text-body px-2 py-1 rounded-lg"
                    onClick={() => setEnableAll(true)}
                >
                    Select all
                </button>
                <button
                    className="font-semibold active:font-bold shadow-md bg-light active:brightness-95 transition-all duration-75 text-body px-2 py-1 rounded-lg"
                    onClick={() => setEnableAll(false)}
                >
                    Deselect all
                </button>
            </div>
            <ul className="flex flex-col gap-4 w-full">
                {enabledAvailabilities.map((availValue) => (
                    <DayAvailability
                        availability={availValue}
                        onAvailabilityChange={(newAvailability) => {
                            const newAvailabilities = availability.map((availValue) => {
                                if (availValue.id === newAvailability.id) {
                                    return newAvailability;
                                }
                                return availValue;
                            });
                            onAvailabilityChange(newAvailabilities);
                        }}
                        key={availValue.id}
                    />
                ))}
            </ul>
        </>
    );
};

export default AvailabilityEdit;
