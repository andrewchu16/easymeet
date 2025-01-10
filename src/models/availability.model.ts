export interface TimeslotInfo {
    name: string;
    enabled: boolean;
}

export interface Availability {
    date: Date;
    timeslots: TimeslotInfo[];
    enabled: boolean;
}