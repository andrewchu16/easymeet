import { FirebaseApp } from "firebase/app";
import { Availability } from "../models/availability.model";
import { Timeslot } from "../models/timeslot.model";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    updateDoc,
    where,
} from "@firebase/firestore";
import Meetup from "../models/meetup.model";
import { getRandomId } from "../util/getRandomId";
import FirebaseMeetupData from "../models/firebaseMeetup.model";
import Participant from "../models/participant.model";

const convertFirebaseToMeetup = (
    data: FirebaseMeetupData,
    id: string
): Meetup => {
    const availability = Object.entries(data.availability).map(
        ([dateString, timeslots]) => {
            const date = new Date(dateString);
            return {
                date,
                enabled: true,
                timeslots: timeslots.map((name) => ({
                    name,
                    enabled: true,
                    id: getRandomId(5),
                })),
                id: getRandomId(5),
            };
        }
    );

    // Create timeslots so that they are sorted by the first item in the record value arrray
    const tmpTimeslots = Object.entries(data.timeslots)
        .map(([name, description]) => ({
            name,
            description,
            id: getRandomId(5),
        }))
        .sort(
            (a, b) =>
                Number.parseInt(a.description[0]) -
                Number.parseInt(b.description[0])
        );

    const timeslots = tmpTimeslots.map((timeslot) => ({
        name: timeslot.name,
        description: timeslot.description[1],
        id: timeslot.id,
    }));

    const meetup: Meetup = {
        id,
        name: data.name,
        createdAt: data.createdAt,
        availability,
        timeslots,
        participantNames: data.participantNames,
    };

    return meetup;
};

const convertMeetupToFirebase = (meetup: Meetup, version: string): FirebaseMeetupData => {
    const meetupAvailability = meetup.availability.reduce((acc, curr) => {
        if (curr.enabled) {
            acc[curr.date.toISOString()] = curr.timeslots
                .filter((t) => t.enabled)
                .map((t) => t.name);
        }
        return acc;
    }, {} as Record<string, string[]>);

    const meetupTimeslots = meetup.timeslots.reduce((acc, curr, index) => {
        acc[curr.name] = [index.toString(), curr.description];
        return acc;
    }, {} as Record<string, string[]>);

    const meetupData = {
        name: meetup.name,
        createdAt: meetup.createdAt,
        availability: meetupAvailability,
        timeslots: meetupTimeslots,
        participantNames: meetup.participantNames,
        version: version
    };

    return meetupData;
};

const createNewMeetupData = (
    name: string,
    availability: Availability[],
    timeslots: Timeslot[]
): Meetup => {
    const meetup: Meetup = {
        id: getRandomId(6),
        name,
        createdAt: new Date(),
        availability,
        timeslots,
        participantNames: [],
    };

    return meetup;
};

const createMeetup = async (app: FirebaseApp, meetup: Meetup, version="1.0") => {
    const meetupData = convertMeetupToFirebase(meetup, version);
    const db = getFirestore(app);
    const docRef = doc(db, "meetups", meetup.id);

    await setDoc(docRef, meetupData);
};

interface ParticipantData {
    participantId: string;
    participant: Participant;
    isNew: boolean;
}

const createParticipant = async (
    app: FirebaseApp,
    meetup: Meetup,
    participantName: string
): Promise<ParticipantData> => {
    const db = getFirestore(app);

    // Check if participant already exists
    if (meetup.participantNames.includes(participantName)) {
        // Get participant data with the same name
        const participantsRef = collection(
            db,
            "meetups",
            meetup.id,
            "participants"
        );

        const q = query(participantsRef, where("name", "==", participantName));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            let pData: ParticipantData | null = null;
            querySnapshot.forEach((doc) => {
                const participantId = doc.id;

                pData = {
                    participantId,
                    participant: doc.data() as Participant,
                    isNew: false,
                };
            });

            return pData!;
        }
    }

    // Add participant data
    const participantData: Participant = {
        name: participantName,
        availability: {},
        createdAt: new Date(),
    };

    const docRef = addDoc(
        collection(db, "meetups", meetup.id, "participants"),
        participantData
    );

    // Add participant's name to meetup name list
    const meetupRef = doc(db, "meetups", meetup.id);
    await updateDoc(meetupRef, {
        participantNames: [...meetup.participantNames, participantName],
    });

    const docSnap = await docRef;

    return {
        participantId: docSnap.id,
        participant: participantData,
        isNew: true,
    };
};

const updateParticipant = async (
    app: FirebaseApp,
    participantId: string,
    participantData: Participant,
    meetupId: string
) => {
    const db = getFirestore(app);
    const docRef = doc(db, "meetups", meetupId, "participants", participantId);
    await updateDoc(docRef, { availability: participantData.availability });
};

const getMeetup = async (
    app: FirebaseApp,
    meetupId: string
): Promise<Meetup | null> => {
    const db = getFirestore(app);
    const docRef = doc(db, "meetups", meetupId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return convertFirebaseToMeetup(
            docSnap.data() as FirebaseMeetupData,
            docSnap.id
        );
    }

    return null;
};

const getParticipants = async (
    app: FirebaseApp,
    meetup: Meetup
): Promise<Participant[]> => {
    const db = getFirestore(app);
    const participantsRef = collection(
        db,
        "meetups",
        meetup.id,
        "participants"
    );
    const participantsSnapshot = await getDocs(participantsRef);

    const participants: Participant[] = [];
    participantsSnapshot.forEach((doc) => {
        const data = doc.data();
        participants.push(data as Participant);
    });

    return participants;
};

export {
    createMeetup,
    convertFirebaseToMeetup,
    convertMeetupToFirebase,
    createNewMeetupData,
    getMeetup,
    getParticipants,
    updateParticipant,
    createParticipant,
};
