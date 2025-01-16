export default interface FirebaseMeetupData {
    name: string;
    createdAt: Date;
    availability: Record<string, string[]>;
    timeslots: Record<string, string[]>; // { "breakfast": ["0", "8am to 12pm"]}
    participantNames: string[];
    version: string;
}
