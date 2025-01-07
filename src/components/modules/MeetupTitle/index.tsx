import { MaterialSymbol } from "react-material-symbols";
import "./MeetupTitle.css";
import { useRef } from "react";

interface MeetupTitleProps {
    editable: boolean;
    handleChange: (event: React.FormEvent<HTMLDivElement>) => void;
    title: string;
}

const MeetupTitle = ({
    editable = false,
    handleChange,
    title,
}: MeetupTitleProps) => {
    const titleRef = useRef<HTMLHeadingElement>(null);

    const handleEnterKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.currentTarget.blur();
        }
    };

    const focusTitle = () => {
        titleRef.current?.focus();

        // Move cursor to end of text
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(titleRef.current as Node);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
    };

    return (
        <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5">
            <h1
                ref={titleRef}
                suppressContentEditableWarning
                contentEditable={editable}
                className={"meetup-title" + (editable ? " is-editable" : "")}
                onBlur={handleChange}
                onKeyDown={handleEnterKey}
            >
                {title}
            </h1>
            {editable && (
                <MaterialSymbol
                    icon="edit"
                    size={24}
                    color="404040"
                    className="meetup-title-icon"
                    onClick={focusTitle}
                />
            )}
        </div>
    );
};

export default MeetupTitle;
