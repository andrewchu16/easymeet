import "@material-symbols/font-700";
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

        // Reset font size
        if (!titleRef.current) {
            return;
        }
    };

    const adjustFontSize = () => {
        const titleElement = titleRef.current;
        if (!titleElement) {
            return;
        }

        // Reset font size
        let titleFontSize = 36;
        titleElement.style.fontSize = `${titleFontSize}px`;
        titleElement.style.maxWidth = "unset";
        titleElement.style.width = "fit-content";
        titleElement.style.textWrap = "nowrap";

        let titleWidth = titleElement.getBoundingClientRect().width;
        let containerWidth =
            titleElement.parentElement?.getBoundingClientRect().width;
        console.log(titleWidth, containerWidth);
        // Shrink font size until it fits in the container or reaches the minimum font size
        while (
            containerWidth &&
            titleWidth > containerWidth &&
            titleFontSize > 16
        ) {
            titleFontSize--;
            titleElement.style.fontSize = `${titleFontSize}px`;
            titleWidth = titleElement.getBoundingClientRect().width;
            containerWidth =
                titleElement.parentElement?.getBoundingClientRect().width;
        }

        titleElement.style.width = "unset";
        titleElement.style.textWrap = "wrap";
        titleElement.style.maxWidth = "100%";

    };

    return (
        <div className="flex items-center justify-center gap-2 rounded-lg px-2.5 py-1.5 meetup-title-container ml-6 max-w-[350px]">
            <h1
                ref={titleRef}
                suppressContentEditableWarning
                contentEditable={editable}
                className={"meetup-title" + (editable ? " is-editable" : "")}
                onBlur={(event) => {
                    handleChange(event);
                    adjustFontSize();
                }}
                onKeyDown={handleEnterKey}
            >
                {title}
            </h1>
            {editable && (
                <span
                    className="material-symbols-rounded meetup-title-icon text-dark select-none"
                    style={{
                        fontSize: 24,
                    }}
                    onClick={focusTitle}
                >
                    edit
                </span>
            )}
        </div>
    );
};

export default MeetupTitle;
