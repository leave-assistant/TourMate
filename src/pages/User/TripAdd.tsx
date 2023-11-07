import React from 'react';
import { firestore } from './firebase';
import { setDoc } from 'firebase/firestore';
import { UserProvider, useUser } from './UserContext';

const user = useUser();

export const addTripPlan = async (userId, userInfo, tripTitle, tripPlan)) => {
    try {
        const tripPlanRef = doc(firestore, 'TripPlan', userId);
        await setDoc(tripPlanRef, {
            userInfo
        })
    }
    
}