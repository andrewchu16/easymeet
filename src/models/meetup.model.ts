import { Availability } from "./availability.model";
import { Timeslot } from "./timeslot.model";

export default interface Meetup {
    id: string;
    name: string;
    createdAt: Date;
    availability: Availability[];
    timeslots: Timeslot[];
    participantNames: string[];
}

/*
Firebase Firestore structure:
{
    "name": "My Meetup",
    "createdAt": "2021-08-01T00:00:00Z",
    "availability": {
        "2021-08-01": ["breakfast", "lunch", "dinner"],
        "2021-08-02": ["breakfast", "dinner"],
        "2021-08-03": ["lunch", "dinner"]
    },
    "timeslots": {
        "breakfast": "8 to 11 am",
        "lunch": "12 pm",
        "dinner": "6 pm"
    },
    participantNames: ["John", "Andrew"]
}
*/
