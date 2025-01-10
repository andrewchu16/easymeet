import { useState } from "react";
import MeetupTitle from "../../components/modules/MeetupTitle";
import Calendar from "../../components/modules/Calendar";
import TimeslotsEdit from "../../components/modules/TimeslotsEdit";
import { Timeslot } from "../../models/timeslot.model";
import { defaultTimeslots } from "../../data/timeslots";
import AvailabilityEdit from "../../components/modules/AvailabilityEdit";
import { Availability, TimeslotInfo } from "../../models/availability.model";

const Create = () => {
    const [meetupTitle, setMeetupTitle] = useState("New Meetup");
    const [dates, setDates] = useState<Date[]>([]);
    const [timeslots, setTimeslots] = useState<Timeslot[]>(defaultTimeslots);
    const [availability, setAvailability] = useState<Availability[]>([]);

    const handleTitleChange = (event: React.FormEvent<HTMLDivElement>) => {
        setMeetupTitle(event.currentTarget.textContent || "");
    };

    const handleDatesChange = (newDates: Date[]) => {
        newDates.sort();

        const newAvailability = availability.map((availValue) => {
            // Make sure all the timeslots are enabled
            if (newDates.includes(availValue.date)) {
                return {
                    ...availValue,
                    enabled: true,
                };
            }

            // Disable timeslot if the date is not in the new dates
            return {
                ...availValue,
                enabled: false,
            };
        });

        setDates(newDates);
        setAvailability(newAvailability);
    };

    const handleTimeslotChange = (newTimeslots: Timeslot[]) => {
        const newAvailability: Availability[] = availability.map(
            (availValue) => {
                // Remove deleted timeslots from all availabity dates
                const newTimeslotsInfo: TimeslotInfo[] =
                    availValue.timeslots.filter(
                        (t) =>
                            !newTimeslots.some(
                                (newTimeslot) => newTimeslot.name === t.name
                            )
                    );

                // Add new timeslots to all availability dates
                newTimeslots.forEach((newTimeslot) => {
                    if (
                        !newTimeslotsInfo.some(
                            (t) => t.name === newTimeslot.name
                        )
                    ) {
                        newTimeslotsInfo.push({
                            name: newTimeslot.name,
                            enabled: false,
                        });
                    }
                });

                return {
                    ...availValue,
                    timeslots: newTimeslotsInfo,
                };
            }
        );

        setTimeslots(newTimeslots);
        setAvailability(newAvailability);
    };

    const handleAvailabilityChange = (newAvailability: Availability[]) => {
        setAvailability(newAvailability);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-center mb-4">
                <MeetupTitle
                    editable
                    handleChange={handleTitleChange}
                    title={meetupTitle}
                />
            </div>
            <div className="px-4 w-full flex flex-col gap-5">
                <section className="w-full flex flex-col items-center gap-3">
                    <h2 className="text-lg text-body font-medium">
                        Select dates for{" "}
                        <span className="font-semibold">{meetupTitle}</span>
                    </h2>
                    <Calendar dates={dates} onDatesChange={handleDatesChange} />
                </section>
                {dates.length > 0 && (
                    <section className="w-full flex flex-col items-center gap-3">
                        <h2 className="text-lg text-body font-medium">
                            Choose timeslots for{" "}
                            <span className="font-semibold">{meetupTitle}</span>
                        </h2>
                        <TimeslotsEdit
                            timeslots={timeslots}
                            onTimeslotsChange={handleTimeslotChange}
                        />
                    </section>
                )}
                {dates.length > 0 && timeslots.length > 0 && (
                    <section className="py-7 px-4  bg-lightgray w-full rounded-t-[40px]">
                        <h2 className="text-lg text-body text-center">
                            Timeslots Available
                        </h2>
                        <AvailabilityEdit
                            availability={availability}
                            onAvailabilityChange={handleAvailabilityChange}
                        />
                    </section>
                )}
                {dates.length > 0 &&
                    timeslots.length > 0 &&
                    availability.length > 0 && (
                        <button className="w-full py-3 bg-primary text-white rounded-[10px]">
                            Let's meet!
                        </button>
                    )}
            </div>
        </div>
    );
};

export default Create;
