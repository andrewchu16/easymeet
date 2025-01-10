import { useState } from "react";
import MeetupTitle from "../../components/modules/MeetupTitle";
import Calendar from "../../components/modules/Calendar";
import TimeslotDescriptions, {
    TimeslotDescription,
} from "../../components/modules/TimeslotDefinitions";
import TimeslotEdit, { Timeslot } from "../../components/modules/TimeslotEdit";

const Create = () => {
    const [meetupTitle, setMeetupTitle] = useState("New Meetup");
    const [dates, setDates] = useState<Date[]>([]);
    const [timeslotDescriptions, setTimeslotDescriptions] = useState<
        TimeslotDescription[]
    >([]);
    const [timeslots, setTimeslots] = useState<Timeslot[]>([]);

    const handleTitleChange = (event: React.FormEvent<HTMLDivElement>) => {
        setMeetupTitle(event.currentTarget.textContent || "");
    };

    const handleDatesChange = (dates: Date[]) => {
        setDates(dates);
    }

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
                            Select available timeslots
                        </h2>
                        <TimeslotDescriptions
                            descriptions={timeslotDescriptions}
                            onDescriptionsChange={setTimeslotDescriptions}
                        />
                    </section>
                )}
            </div>
            {dates.length > 0 && timeslotDescriptions.length > 0 && (
                <section className="py-7 px-4  bg-lightgray w-full rounded-t-[40px]">
                    <h2 className="text-lg text-body">Timeslots Available</h2>
                    <TimeslotEdit
                        timeslots={timeslots}
                        onTimeslotsChange={setTimeslots}
                    />
                </section>
            )}
            {dates.length > 0 &&
                timeslotDescriptions.length > 0 &&
                timeslots.length > 0 && (
                    <button className="w-full py-3 bg-primary text-white rounded-[10px]">
                        Let's meet!
                    </button>
                )}
        </div>
    );
};

export default Create;
