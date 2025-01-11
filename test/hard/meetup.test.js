import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
} from "@firebase/rules-unit-testing";
import { setDoc, getDoc, doc, addDoc, collection } from "firebase/firestore";
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
});

describe("Firestore /meetups create rules", () => {
    it("Meetups with non-list availability cannot be created (error value in non-zero index)", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            availability: {
                "2024-12-31": ["breakfast", "lunch", "dinner"],
                "2025-01-01": 0,
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslots: {
                breakfast: ["0", "8 am to 11 am"],
                lunch: ["1", "11 am to 2 pm"],
                dinner: ["2", "5 pm to 8 pm"],
            },
        };

        const docRef = doc(db, "meetups", "meetup1");

        await assertFails(setDoc(docRef, meetupData));
    });

    it("Meetups with non-string values for availability cannot be created (error value in non-zero index)", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            availability: {
                "2024-12-31": ["breakfast"],
                "2025-01-01": ["breakfast", "dinner", 2],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslots: {
                breakfast: ["0", "8 am to 11 am"],
                lunch: ["1", "11 am to 2 pm"],
                dinner: ["2", "5 pm to 8 pm"],
            },
        };

        const docRef = doc(db, "meetups", "meetup1");

        await assertFails(setDoc(docRef, meetupData));
    });

    it("Meetups with non-string timeslot descriptions cannot be created (error value in non-zero index)", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            availability: {
                "2024-12-31": ["breakfast", "lunch", "dinner"],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslots: {
                breakfast: ["0", "8 am to 11 am"],
                lunch: 1,
                dinner: ["1", "5 pm to 8 pm"],
            },
        };

        const docRef = doc(db, "meetups", "meetup1");

        await assertFails(setDoc(docRef, meetupData));
    });
});
