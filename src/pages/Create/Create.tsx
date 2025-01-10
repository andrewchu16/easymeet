import { useState } from "react";
import MeetupTitle from "../../components/modules/MeetupTitle";
import Calendar from "../../components/modules/Calendar";
import TimeslotDefintions from "../../components/modules/TimeslotDefinitions";
import TimeslotEdit from "../../components/modules/TimeslotEdit";

const Create = () => {
    const [meetupTitle, setMeetupTitle] = useState("New Meetup");
    const [dates, setDates] = useState<Date[]>([]);
    const [timeslotDescriptions, setTimeslotDescriptions] = useState<
        Map<string, string>
    >(new Map());
    const [timeslots, setTimeslots] = useState<Map<string, string[]>>(
        new Map()
    );

    const handleTitleChange = (event: React.FormEvent<HTMLDivElement>) => {
        setMeetupTitle(event.currentTarget.textContent || "");
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
            <div className="px-4 w-full">
                <section className="w-full flex flex-col items-center gap-1">
                    <h2 className="text-lg text-body font-medium">
                        Select dates for{" "}
                        <span className="font-semibold">{meetupTitle}</span>
                    </h2>
                    <Calendar  dates={dates} setDates={setDates} />
                    {dates.map((v) => v.getDate()).toString()}
                </section>
                {dates.length > 0 && (
                    <section className="w-full">
                        <h2 className="text-lg text-body font-medium">
                            Timeslots participants can choose:
                        </h2>
                        <TimeslotDefintions />
                    </section>
                )}
            </div>
            {dates.length > 0 && timeslotDescriptions.size > 0 && (
                <section className="py-7 px-4  bg-lightgray w-full rounded-t-[40px]">
                    <h2 className="text-lg text-body">Timeslots Available</h2>
                    <TimeslotEdit
                        timeslots={timeslots}
                        setTimeslots={setTimeslots}
                    />
                </section>
            )}
        </div>
    );
};

export default Create;
