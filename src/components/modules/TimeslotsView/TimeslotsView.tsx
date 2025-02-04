import { Timeslot } from "../../../models/timeslot.model";
import "./TimeslotsView.css";

interface TimeslotsViewProp {
    timeslots: Timeslot[];
}

const TimeslotsView = ({ timeslots }: TimeslotsViewProp) => {
    const noDescription = timeslots.every((timeslot) => !timeslot.description);
    return (
        <div className="flex justify-center">
            <div className="grid auto-rows-auto timeslots-container gap-x-2">
                {timeslots.map((timeslot) => (
                    <>
                        {noDescription ? (
                            <h3
                                className="font-semibold text-dark text-center col-span-2"
                            >
                                {timeslot.name}
                            </h3>
                        ) : (
                            <>
                                <h3 className="font-semibold text-dark text-end col-span-1">
                                    {timeslot.name}
                                </h3>
                                <p className="text-begin text-body col-span-1">
                                    {timeslot.description}
                                </p>
                            </>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
};

export default TimeslotsView;
