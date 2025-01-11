import { FirebaseApp } from "firebase/app";
import { Availability } from "../models/availability.model";
import { Timeslot } from "../models/timeslot.model";
import { doc, getDoc, getFirestore, setDoc } from "@firebase/firestore";
import Meetup from "../models/meetup.model";
import { getRandomId } from "../util/getRandomId";
import FirebaseMeetupData from "../models/firebaseMeetup.model";

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

    const timeslots = Object.entries(data.timeslots).map(
        ([name, description]) => ({
            name,
            description,
            id: getRandomId(5),
        })
    );

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

const convertMeetupToFirebase = (meetup: Meetup): FirebaseMeetupData => {
    const meetupAvailability = meetup.availability.reduce((acc, curr) => {
        if (curr.enabled) {
            acc[curr.date.toISOString()] = curr.timeslots
                .filter((t) => t.enabled)
                .map((t) => t.name);
        }
        return acc;
    }, {} as Record<string, string[]>);

    const meetupTimeslots = meetup.timeslots.reduce((acc, curr) => {
        acc[curr.name] = curr.description;
        return acc;
    }, {} as Record<string, string>);

    const meetupData = {
        name: meetup.name,
        createdAt: meetup.createdAt,
        availability: meetupAvailability,
        timeslots: meetupTimeslots,
        participantNames: meetup.participantNames,
    };

    return meetupData;
};

const createNewMeetupData = (
    name: string,
    availability: Availability[],
    timeslots: Timeslot[]
): Meetup => {
    const meetup: Meetup = {
        id: getRandomId(5),
        name,
        createdAt: new Date(),
        availability,
        timeslots,
        participantNames: [],
    };

    return meetup;
};

const createMeetup = async (app: FirebaseApp, meetup: Meetup) => {
    const meetupData = convertMeetupToFirebase(meetup);

    console.log(meetupData);

    const db = getFirestore(app);
    const docRef = doc(db, "meetups", meetup.id);
    await setDoc(docRef, meetupData);
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

export {
    createMeetup,
    convertFirebaseToMeetup,
    convertMeetupToFirebase,
    createNewMeetupData,
    getMeetup,
};
