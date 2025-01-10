export interface TimeslotInfo {
    name: string;
    enabled: boolean;
    id: string;
}

export interface Availability {
    date: Date;
    timeslots: TimeslotInfo[];
    enabled: boolean;
    id: string;
}