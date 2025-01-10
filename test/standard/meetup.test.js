import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
    setDoc,
    getDoc,
    doc,
    addDoc,
    collection,
    getDocs,
} from "firebase/firestore";
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
    it("Only authenticated users can create meetups", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: [],
            availability: {
                "2024-12-31": ["breakfast", "lunch", "dinner"],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslots: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        const docRef = doc(db, "meetups", "meetup1");

        await assertSucceeds(setDoc(docRef, meetupData));
    });

    it("Meetups without a meetup name cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            availability: {
                "2024-12-31": ["breakfast", "lunch", "dinner"],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslots: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };
        
        const docRef = doc(db, "meetups", "meetup1");

        await assertFails(setDoc(docRef, meetupData));
    });

    it("Meetups without a createdAt date cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            participantNames: ["John", "Alice"],
            availability: {
                "2024-12-31": ["breakfast", "lunch", "dinner"],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslots: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        const docRef = doc(db, "meetups", "meetup1");

        await assertFails(setDoc(docRef, meetupData));
    });

    it("Meetups without participant names cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            availability: {
                "2024-12-31": ["breakfast", "lunch", "dinner"],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslots: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        const docRef = doc(db, "meetups", "meetup1");

        await assertFails(setDoc(docRef, meetupData));
    });

    it("Meetups without valid participant names cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: [0],
            availability: {
                "2024-12-31": ["breakfast", "lunch", "dinner"],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslots: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        const docRef = doc(db, "meetups", "meetup1");

        await assertFails(setDoc(docRef, meetupData));
    });

    it("Meetups without availability cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            timeslots: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        const docRef = doc(db, "meetups", "meetup1");

        await assertFails(setDoc(docRef, meetupData));
    });

    it("Meetups with non-list availability cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            availability: {
                "2024-12-31": 0,
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslots: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        const docRef = doc(db, "meetups", "meetup1");

        await assertFails(setDoc(docRef, meetupData));
    });

    it("Meetups with non-string values for availability cannot be created", async () => {
        // Create an anonymous authenticated user
        const anonUser = testEnv.authenticatedContext("anon");
        const db = anonUser.firestore();

        const meetupData = {
            name: "Meetup #1",
            createdAt: new Date(),
            participantNames: ["John", "Alice"],
            availability: {
                "2024-12-31": [0],
                "2025-01-01": ["breakfast", "dinner"],
                "2025-01-02": ["breakfast", "lunch"],
            },
            timeslots: {
                breakfast: "8 am to 11 am",
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        const docRef = doc(db, "meetups", "meetup1");

        await assertFails(setDoc(docRef, meetupData));
    });

    it("Meetups without timeslot descriptions cannot be created", async () => {
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
        };

        const docRef = doc(db, "meetups", "meetup1");

        await assertFails(setDoc(docRef, meetupData));
    });

    it("Meetups with non-string timeslot descriptions cannot be created", async () => {
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
                breakfast: 0,
                lunch: "11 am to 2 pm",
                dinner: "5 pm to 8 pm",
            },
        };

        const docRef = doc(db, "meetups", "meetup1");

        await assertFails(setDoc(docRef, meetupData));
    });

    it("Meetups with extra fields cannot be created", async () => {
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
                breakfast: "8 am to 11 am",
                lunch: "11 am to 3 pm",
                dinner: "5 pm to 8 pm",
            },
            foo: "bar",
        };

        const docRef = doc(db, "meetups", "meetup1");

        await assertFails(setDoc(docRef, meetupData));
    });
});

describe("Firestore /meetup read rules", () => {
    it("Anyone can get a meetup", async () => {
        const user = testEnv.unauthenticatedContext();
        const db = user.firestore();

        const meetupRef = doc(db, "meetups", "meetup1");
        await assertSucceeds(getDoc(meetupRef));
    });

    it("Cannot list all meetups", async () => {
        const user = testEnv.authenticatedContext("John");
        const db = user.firestore();

        const meetupsRef = collection(db, "meetups");
        await assertFails(getDocs(meetupsRef));
    });
});
