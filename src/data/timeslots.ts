import type { Timeslot } from "../models/timeslot.model";

const defaultTimeslots: Timeslot[] = [
    {
        name: "Morning",
        description: "9am - 12pm",
    },
    {
        name: "Afternoon",
        description: "12pm - 3pm",
    },
    {
        name: "Evening",
        description: "3pm - 6pm",
    },
    {
        name: "Night",
        description: "6pm - 9pm",
    }
];

export { defaultTimeslots };
