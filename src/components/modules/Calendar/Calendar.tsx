// did not like using the react-multi-day-picker library :(
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import "./Calendar.css";
import CalendarChevron from "./components/CalendarChevron";

interface CalendarProps {
    dates: Date[];
    onDatesChange: (dates: Date[]) => void;
    disabled: boolean;
}

const Calendar = ({
    dates,
    onDatesChange,
    disabled = false,
}: CalendarProps) => {
    const defaultClassNames = getDefaultClassNames();

    // 5 years ago
    const startMonth = new Date();

    // 10 years from now
    const endMonth = new Date();
    endMonth.setFullYear(endMonth.getFullYear() + 10);

    return (
        <DayPicker
            mode="multiple"
            required
            startMonth={startMonth}
            endMonth={endMonth}
            selected={dates}
            onSelect={onDatesChange}
            captionLayout="dropdown"
            disabled={!disabled ? { before: new Date() } : () => false}
            showOutsideDays
            classNames={{
                weekday: "cldr-weekday",
                weeks: "cldr-weeks",
                day: "cldr-day",
                day_button: "cldr-day-button",
                today: "cldr-today",
                selected: "cldr-selected",
                root: "cldr-root",
                month_caption: `${defaultClassNames.month_caption} cldr-month-caption`,
                chevron: `${defaultClassNames.chevron} cldr-chevron`,
                nav: "cldr-nav",
                outside: "cldr-outside",
                dropdown: `${defaultClassNames.dropdown} cldr-dropdown`,
                dropdowns: `${defaultClassNames.dropdowns} cldr-dropdowns`,
            }}
            components={{
                Chevron: CalendarChevron,
            }}
        />
    );
};

export default Calendar;
