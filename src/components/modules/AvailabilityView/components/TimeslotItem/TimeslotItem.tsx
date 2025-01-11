import Participant from "../../../../../models/participant.model";
import getReadableDate from "../../../../../util/getReadableDate";
import "./TimeslotItem.css";

interface TimeslotItemProps {
    timeslotName: string;
    date: Date;
    participants: Participant[];
    enabled: boolean;
    onEnableChange: (enabled: boolean) => void;
}

const TimeslotItem = ({
    timeslotName,
    date,
    participants,
    enabled,
    onEnableChange
}: TimeslotItemProps) => {
    const availableParticipants = participants.filter((participant) =>
        Object.entries(participant.availability).some(([dateString, availability]) => {
            return dateString === getReadableDate(date) && availability.includes(timeslotName);
        })
    );

    const names = availableParticipants.map((participant) => participant.name).sort().join(", ");

    return (
        <li
            className={
                "bg-light rounded-xl px-4 py-2 timeslot-item hover:cursor-pointer" +
                (enabled ? " active" : "")
            }
            onClick={() => onEnableChange(!enabled)}
        >
            <label className="text-lg flex gap-3 items-center hover:cursor-pointer py-1">
                <span
                    className="material-symbols-rounded select-none"
                    style={{ fontSize: 22 }}
                >
                    {enabled ? "check_box" : "check_box_outline_blank"}
                </span>
                <div>
                    <h2 className="text-dark font-medium leading-snug">{timeslotName}</h2>
                    <p className="text-body text-sm -mt-0.5 leading-[1.1]">{names}</p>
                </div>
            </label>
        </li>
    );
};

export default TimeslotItem;
