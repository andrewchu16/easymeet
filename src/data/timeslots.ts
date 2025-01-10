import type { Timeslot } from "../models/timeslot.model";

const defaultTimeslots: Timeslot[] = [
    {
        name: "Morning",
        description: "9am - 12pm",
        id: "a"
    },
    {
        name: "Afternoon",
        description: "12pm - 3pm",
        id: "b"
    },
    {
        name: "Evening",
        description: "3pm - 6pm",
        id: "c"
    },
    {
        name: "Night",
        description: "6pm - 9pm",
        id: "d"
    }
];

export { defaultTimeslots };
