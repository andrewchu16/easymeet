import { useState } from "react";
import { Timeslot } from "../../models/timeslot.model";
import { Availability, TimeslotInfo } from "../../models/availability.model";
import { defaultTimeslots } from "../../data/timeslots";
import { getRandomId } from "../../util/getRandomId";
import {
    MeetupTitle,
    Calendar,
    TimeslotsEdit,
    AvailabilityEdit,
} from "../../components/modules";
import {
    createMeetup,
    createNewMeetupData,
} from "../../firebase/firebaseManager";
import { app } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [meetupTitle, setMeetupTitle] = useState("New Meetup");
    const [dates, setDates] = useState<Date[]>([]);
    const [timeslots, setTimeslots] = useState<Timeslot[]>(defaultTimeslots);
    const [availability, setAvailability] = useState<Availability[]>([]);

    const navigate = useNavigate();

    const handleTitleChange = (event: React.FormEvent<HTMLDivElement>) => {
        setMeetupTitle(event.currentTarget.textContent || "");
    };

    const handleDatesChange = (newDates: Date[]) => {
        newDates.sort((a, b) => a.getTime() - b.getTime());

        // Update existing availability to match the new dates
        const newAvailability = availability.map((availValue) => {
            // Make sure all the timeslots are enabled
            if (
                newDates.some(
                    (date) => date.getTime() === availValue.date.getTime()
                )
            ) {
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

        // Add new dates to availability
        newDates.forEach((date) => {
            if (
                !newAvailability.some(
                    (availValue) => availValue.date.getTime() === date.getTime()
                )
            ) {
                newAvailability.push({
                    date,
                    enabled: true,
                    timeslots: timeslots.map((t) => ({
                        name: t.name,
                        enabled: false,
                        id: t.id,
                    })),
                    id: getRandomId(),
                });
            }
        });

        newAvailability.sort((a, b) => a.date.getTime() - b.date.getTime());

        setDates(newDates);
        setAvailability(newAvailability);
    };

    const handleTimeslotChange = (newTimeslots: Timeslot[]) => {
        const newAvailability: Availability[] = availability.map(
            (availValue) => {
                // Remove deleted timeslots from all availabity dates
                let newTimeslotsInfo: TimeslotInfo[] =
                    availValue.timeslots.filter((t) =>
                        newTimeslots.some(
                            (newTimeslot) => newTimeslot.id === t.id
                        )
                    );

                // Add new timeslots to all availability dates and edit existing ones
                newTimeslots.forEach((newTimeslot) => {
                    let isNew = true;

                    newTimeslotsInfo = newTimeslotsInfo.map((t) => {
                        if (t.id === newTimeslot.id) {
                            isNew = false;
                            return {
                                ...t,
                                name: newTimeslot.name,
                            };
                        }

                        return t;
                    });

                    if (isNew) {
                        newTimeslotsInfo.push({
                            name: newTimeslot.name,
                            enabled: false,
                            id: newTimeslot.id,
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

    const handleCreateMeetup = async () => {
        const meetupData = createNewMeetupData(
            meetupTitle,
            availability,
            timeslots
        );

        await createMeetup(app, meetupData);

        navigate(`/share/${meetupData.id}?new=true`);
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center mb-4">
                <MeetupTitle
                    editable
                    handleChange={handleTitleChange}
                    title={meetupTitle}
                />
            </div>
            <div className="px-4 w-full flex flex-col gap-5 max-w-[500px]">
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
                        <button
                            className="w-full py-3 my-8 mb-6 bg-primary text-white rounded-[10px] active:bg-secondary active:text-body transition-all"
                            onClick={handleCreateMeetup}
                        >
                            Let's meet!
                        </button>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Create;
