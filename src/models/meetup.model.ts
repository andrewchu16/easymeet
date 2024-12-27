export default interface Meetup {
    meeetupId: string;
    name: string;
    createdAt: Date;
    timeslots: Map<string, string[]>;
    timeslotDescription: Map<string, string>;
    participantNames: string[];
}

/*
{
    "meetupId": "123",
    "name": "My Meetup",
    "createdAt": "2021-08-01T00:00:00Z",
    "timeslots": {
        "2021-08-01": ["breakfast", "lunch", "dinner"],
        "2021-08-02": ["breakfast", "dinner"],
        "2021-08-03": ["lunch", "dinner"]
    },
    "timeslotDescription": {
        "breakfast": "8 to 11 am",
        "lunch": "12 pm",
        "dinner": "6 pm"
    },
    participantNames: ["John", "Andrew"]
}
*/
