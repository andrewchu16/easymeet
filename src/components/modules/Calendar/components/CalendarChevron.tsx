import { ChevronProps } from "react-day-picker";
import '@material-symbols/font-400';
import "react-day-picker/style.css";

const CalendarChevron = (props: ChevronProps) => {
    let icon: string;
    let size: number;
    let color: string;

    switch (props.orientation) {
        case "left":
            size = 40;
            icon = "chevron_left";
            color = "var(--color-primary)";
            break;
        case "right":
            size = 40;
            icon = "chevron_right";
            color = "var(--color-primary)";
            break;
        case "up":
            size = 24;
            icon = "keyboard_arrow_up";
            color = "var(--color-dark)";
            break;
        case "down":
            size = 24;
            icon = "keyboard_arrow_down";
            color = "var(--color-dark)";
            break;
        default:
            size = 24;
            icon = "question_mark";
            color = "var(--color-dark)";
            break;
    }

    if (props.disabled) {
        color = "var(--color-lightgray)";
    }

    return (
        <span style={{
            fontSize: size,
            color: color,
        }} className="material-symbols-rounded select-none">{icon}</span>
    );
};

export default CalendarChevron;
