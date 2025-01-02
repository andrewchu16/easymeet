import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
} from "@firebase/rules-unit-testing";
import { setDoc, getDoc, doc, addDoc, collection, updateDoc } from "firebase/firestore";
import fs from "fs";
import { setLogLevel } from "@firebase/logger";

const projectId = "easymeet-a3ac8";
let testEnv = await initializeTestEnvironment({
    projectId,
    firestore: {
        rules: fs.readFileSync("firestore.rules", "utf8"),
        host: "localhost",
        port: 8080,
    },
});

before(async () => {
    setLogLevel("silent"); // Suppress all Firebase logs
    testEnv = await initializeTestEnvironment({
        projectId,
        firestore: {
            rules: fs.readFileSync("firestore.rules", "utf8"),
            host: "localhost",
            port: 8080,
        },
    });
});

after(async () => {
    await testEnv.cleanup();
});

beforeEach(async () => {
    await testEnv.clearFirestore();

    testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John"],
            timeslots: {
                "2024-12-31": ["breakfast", "lunch", "dinner"],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslotDescription: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        const meetupRef = doc(db, "meetups", "meetup1");
        await setDoc(meetupRef, meetupData);

        const participantData = {
            name: "John",
            createdAt: new Date(),
            availability: {
                "2024-12-31": ["breakfast"],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["lunch"],
            },
        };

        const participantRef = doc(
            db,
            "meetups",
            "meetup1",
            "participants",
            "participant1"
        );
        await setDoc(participantRef, participantData);
    });
});

describe("Firestore /meetups/{meetupId}/participants read rules", () => {
    it("Anyone can read participant data", async () => {
        const user = testEnv.unauthenticatedContext();
        const db = user.firestore();

        const participantRef = doc(
            db,
            "meetups",
            "meetup1",
            "participants",
            "participant1"
        );
        await assertSucceeds(getDoc(participantRef));
    });
});

describe("Firestore /meetups/{meetupId}/participants write rules", () => {
    it("Authenticated users can create new participants", async () => {
        const user = testEnv.authenticatedContext("Alice");
        const db = user.firestore();

        const participantRef = doc(
            db,
            "meetups",
            "meetup1",
            "participants",
            "participant2"
        );

        const participantData = {
            name: "Alice",
            createdAt: new Date(),
            availability: {
                "2024-12-31": [],
                "2025-01-01": ["lunch", "dinner"],
                "2025-01-02": ["lunch"],
            },
        };

        await assertSucceeds(setDoc(participantRef, participantData));
    });

    it("Unauthenticated users cannot create new participants", async () => {
        const user = testEnv.unauthenticatedContext();
        const db = user.firestore();

        const participantRef = doc(
            db,
            "meetups",
            "meetup1",
            "participants",
            "participant2"
        );

        const participantData = {
            name: "Alice",
            createdAt: new Date(),
            availability: {
                "2024-12-31": [],
                "2025-01-01": ["dinner"],
                "2025-01-02": ["lunch"],
            },
        };

        await assertFails(setDoc(participantRef, participantData));
    });

    it("Participant data without a name cannot be created", async () => {
        const user = testEnv.authenticatedContext("Alice");
        const db = user.firestore();

        const participantRef = doc(
            db,
            "meetups",
            "meetup1",
            "participants",
            "participant2"
        );

        const participantData = {
            createdAt: new Date(),
            availability: {
                "2024-12-31": [],
                "2025-01-01": ["dinner"],
                "2025-01-02": ["lunch"],
            },
        };

        await assertFails(setDoc(participantRef, participantData));
    });

    it("Participant data without an availability cannot be created", async () => {
        const user = testEnv.authenticatedContext("Alice");
        const db = user.firestore();

        const participantRef = doc(
            db,
            "meetups",
            "meetup1",
            "participants",
            "participant2"
        );

        const participantData = {
            name: "Alice",
            createdAt: new Date(),
        };

        await assertFails(setDoc(participantRef, participantData));
    });

    it("Participant data without a createdAt date cannot be created", async () => {
        const user = testEnv.authenticatedContext("Alice");
        const db = user.firestore();

        const participantRef = doc(
            db,
            "meetups",
            "meetup1",
            "participants",
            "participant2"
        );

        const participantData = {
            name: "Alice",
            availability: {
                "2024-12-31": [],
                "2025-01-01": ["dinner"],
                "2025-01-02": ["lunch"],
            },
        };

        await assertFails(setDoc(participantRef, participantData));
    });

    it("Participant data with a non-string name cannot be created", async () => {
        const user = testEnv.authenticatedContext("Alice");
        const db = user.firestore();

        const participantRef = doc(
            db,
            "meetups",
            "meetup1",
            "participants",
            "participant2"
        );

        const participantData = {
            name: 123,
            createdAt: new Date(),
            availability: {
                "2024-12-31": [],
                "2025-01-01": ["dinner"],
                "2025-01-02": ["lunch"],
            },
        };

        await assertFails(setDoc(participantRef, participantData));
    });

    it("Participant data with a non-date createdAt date cannot be created", async () => {
        const user = testEnv.authenticatedContext("Alice");
        const db = user.firestore();

        const participantRef = doc(
            db,
            "meetups",
            "meetup1",
            "participants",
            "participant2"
        );

        const participantData = {
            name: "Alice",
            createdAt: "2024-12-31",
            availability: {
                "2024-12-31": [],
                "2025-01-01": ["dinner"],
                "2025-01-02": ["lunch"],
            },
        };

        await assertFails(setDoc(participantRef, participantData));
    });

    it("Participant data with a non-map availability cannot be created", async () => {
        const user = testEnv.authenticatedContext("Alice");
        const db = user.firestore();

        const participantRef = doc(
            db,
            "meetups",
            "meetup1",
            "participants",
            "participant2"
        );

        const participantData = {
            name: "Alice",
            createdAt: new Date(),
            availability: "2024-12-31",
        };

        await assertFails(setDoc(participantRef, participantData));
    });

    it("Participant data with a non-array availability value cannot be created", async () => {
        const user = testEnv.authenticatedContext("Alice");
        const db = user.firestore();

        const participantRef = doc(
            db,
            "meetups",
            "meetup1",
            "participants",
            "participant2"
        );

        const participantData = {
            name: "Alice",
            createdAt: new Date(),
            availability: {
                "2024-12-31": "breakfast",
                "2025-01-01": "dinner",
                "2025-01-02": "lunch",
            },
        };

        await assertFails(setDoc(participantRef, participantData));
    });

    it("Participant data with a non-string availability array value cannot be created", async () => {
        const user = testEnv.authenticatedContext("Alice");
        const db = user.firestore();

        const participantRef = doc(
            db,
            "meetups",
            "meetup1",
            "participants",
            "participant2"
        );

        const participantData = {
            name: "Alice",
            createdAt: new Date(),
            availability: {
                "2024-12-31": [123],
                "2025-01-01": ["dinner"],
                "2025-01-02": ["lunch"],
            },
        };

        await assertFails(setDoc(participantRef, participantData));
    });
    
    it("Cannot create a participant with a name that already exists in the meetup", async () => {
        const user = testEnv.authenticatedContext("Alice");
        const db = user.firestore();

        const participantRef = doc(
            db,
            "meetups",
            "meetup1",
            "participants",
            "participant2"
        );

        const participantData = {
            name: "John",
            createdAt: new Date(),
            availability: {
                "2024-12-31": [],
                "2025-01-01": ["dinner"],
                "2025-01-02": ["lunch"],
            },
        };

        await assertFails(setDoc(participantRef, participantData));
    });

    // todo: Cannot create a participant with an availability that is not a subset of the meetup's timeslots
});

describe("Firestore /meetups/{meetupId}/participants/{participantId} update rules", () => {
    it("Authenticated users can update their own participant availability", async () => {
        const user = testEnv.authenticatedContext("John");
        const db = user.firestore();

        const participantRef = doc(
            db,
            "meetups",
            "meetup1",
            "participants",
            "participant1"
        );

        const participantData = {
            availability: {
                "2024-12-31": ["breakfast", "lunch"],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["lunch"],
            },
        };

        await assertSucceeds(updateDoc(participantRef, participantData));
    });
});
