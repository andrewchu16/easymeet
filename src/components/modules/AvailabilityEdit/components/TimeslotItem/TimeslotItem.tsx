import { TimeslotInfo } from "../../../../../models/availability.model";
import "./TimeslotItem.css";
import "@material-symbols/font-500";

interface TimeslotItem {
    info: TimeslotInfo;
    onEnableChange: (enabled: boolean) => void;
}

const TimeslotItem = ({ info, onEnableChange }: TimeslotItem) => {
    return (
        <li
            className={
                "bg-light rounded-xl px-4 py-2 timeslot-item hover:cursor-pointer" +
                (info.enabled ? " active" : "")
            }
            onClick={() => onEnableChange(!info.enabled)}
        >
            <label className="text-lg flex gap-3 items-center hover:cursor-pointer">
                <span
                    className="material-symbols-rounded select-none"
                    style={{ fontSize: 22 }}
                >
                    {info.enabled ? "check_box" : "check_box_outline_blank"}
                </span>
                {info.name}
            </label>
        </li>
    );
};

export default TimeslotItem;
