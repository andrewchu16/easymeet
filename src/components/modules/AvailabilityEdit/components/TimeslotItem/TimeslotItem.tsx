import { MaterialSymbol } from "react-material-symbols";
import { TimeslotInfo } from "../../../../../models/availability.model";
import "./TimeslotItem.css";

interface TimeslotItem {
    info: TimeslotInfo;
    onEnableChange: (enabled: boolean) => void;
}

const TimeslotItem = ({ info, onEnableChange }: TimeslotItem) => {
    return (
        <li
            className={
                "bg-light rounded-xl px-4 py-2 timeslot-item" +
                (info.enabled ? " active" : "")
            }
            onClick={() => onEnableChange(!info.enabled)}
        >
            <label className="text-lg flex gap-3 items-center">
                {info.enabled ? (
                    <MaterialSymbol icon="check_box" size={22} />
                ) : (
                    <MaterialSymbol icon="check_box_outline_blank" size={22} />
                )}
                {info.name}
            </label>
        </li>
    );
};

export default TimeslotItem;
