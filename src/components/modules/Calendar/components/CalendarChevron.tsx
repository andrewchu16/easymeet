import { ChevronProps } from "react-day-picker";
import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols";
import "react-day-picker/style.css";

const CalendarChevron = (props: ChevronProps) => {
    let icon: SymbolCodepoints;
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

    return (
        <MaterialSymbol
            icon={icon}
            className="active:scale-110 transition-transform"
            color={color}
            size={size}
        />
    );
};

export default CalendarChevron;
