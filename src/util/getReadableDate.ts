const getReadableDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "short", day: "numeric" };
    let formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
    );

    // Add a period to the abbreviated month, if not already present
    formattedDate = formattedDate.replace(
        /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/,
        "$1."
    );

    return formattedDate;
};

export default getReadableDate;