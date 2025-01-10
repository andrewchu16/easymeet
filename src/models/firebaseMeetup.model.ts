export default interface FirebaseMeetupData {
    name: string;
    createdAt: Date;
    availability: Record<string, string[]>;
    timeslots: Record<string, string>;
    participantNames: string[];
}
