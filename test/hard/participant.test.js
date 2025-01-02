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

describe("Firestore /meetups/{meetupId}/participants write rules", () => {
    it("Participant data with a non-array availability value cannot be created (error value in non-zero index)", async () => {
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
                "2024-12-31": ["breakfast"],
                "2025-01-01": [123],
                "2025-01-02": ["lunch"],
            },
        };

        await assertFails(setDoc(participantRef, participantData));
    });

    it("Participant data with a non-string availability array value cannot be created (error value in non-zero index)", async () => {
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
                "2024-12-31": ["breakfast"],
                "2025-01-01": [123],
                "2025-01-02": ["lunch"],
            },
        };

        await assertFails(setDoc(participantRef, participantData));
    });

    // todo: Cannot create a participant with an availability that is not a subset of the meetup's timeslots
});