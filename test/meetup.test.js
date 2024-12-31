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
    it("Anyone can read meetups", async () => {
        const user = testEnv.unauthenticatedContext();
        const db = user.firestore();

        const meetupRef = doc(db, "meetups", "meetup1");
        await assertSucceeds(getDoc(meetupRef));
    });

    it("Only authenticated users can create meetups", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
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

        await assertSucceeds(addDoc(collection(db, "meetups"), meetupData));
    });

    it("Meetups without a meetup name cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
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

        await assertFails(addDoc(collection(db, "meetups"), meetupData));
    });

    it("Meetups without a createdAt date cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            participantNames: ["John", "Alice"],
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

        await assertFails(addDoc(collection(db, "meetups"), meetupData));
    });

    it("Meetups without participant names cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
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

        await assertFails(addDoc(collection(db, "meetups"), meetupData));
    });

    it("Meetups without valid participant names cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: [0],
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

        await assertFails(addDoc(collection(db, "meetups"), meetupData));
    });

    it("Meetups without timeslots cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            timeslotDescription: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        await assertFails(addDoc(collection(db, "meetups"), meetupData));
    });

    it("Meetups with non-list timeslots cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            timeslots: {
                "2024-12-31": 0,
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslotDescription: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        await assertFails(addDoc(collection(db, "meetups"), meetupData));
    });

    it("Meetups with non-list timeslots cannot be created (error value in non-zero index)", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            timeslots: {
                "2024-12-31": ["breakfast", "lunch", "dinner"],
                "2025-01-01": 0,
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslotDescription: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        await assertFails(addDoc(collection(db, "meetups"), meetupData));
    });

    it("Meetups with non-string values for timeslots cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            timeslots: {
                "2024-12-31": [0],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslotDescription: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        await assertFails(addDoc(collection(db, "meetups"), meetupData));
    });

    it("Meetups with non-string values for timeslots cannot be created (error value in non-zero index)", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            timeslots: {
                "2024-12-31": ["breakfast"],
                "2025-01-01": ["breakfast", "dinner", 2],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslotDescription: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        await assertFails(addDoc(collection(db, "meetups"), meetupData));
    });

    it("Meetups without timeslot descriptions cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            timeslots: {
                "2024-12-31": ["breakfast", "lunch", "dinner"],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
        };

        await assertFails(addDoc(collection(db, "meetups"), meetupData));
    });

    it("Meetups with non-string timeslot descriptions cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            timeslots: {
                "2024-12-31": ["breakfast", "lunch", "dinner"],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslotDescription: {
                breakfast: 0,
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        await assertFails(addDoc(collection(db, "meetups"), meetupData));
    });

    it("Meetups with non-string timeslot descriptions cannot be created (error value in non-zero index)", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            timeslots: {
                "2024-12-31": ["breakfast", "lunch", "dinner"],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslotDescription: {
                breakfast: "8 am to 11 am",
                lunch: 1,
                dinner: "5 pm to 8 pm",
            },
        };

        await assertFails(addDoc(collection(db, "meetups"), meetupData));
    });

    it("Meetups with extra fields cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            timeslots: {
                "2024-12-31": ["breakfast", "lunch", "dinner"],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslotDescription: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 3 pm",
                dinner: "5 pm to 8 pm",
            },
            foo: "bar",
        };

        await assertFails(addDoc(collection(db, "meetups"), meetupData));
    });
});
