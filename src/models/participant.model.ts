export default interface Participant {
    name: string;
    createdAt: Date;
    availability: Record<string, string[]>;
}

/*
Firebase Firestore structure:
{
    "name": "John",
    "createdAt": "2021-08-01T00:00:00Z",
    "availability": {
        "2021-08-01": ["dinner"],
        "2021-08-02": ["breakfast", "dinner"],
        "2021-08-03": []
    }
}
*/