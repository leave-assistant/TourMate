import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from './firebase';
import { DocumentReference, doc, getDoc } from 'firebase/firestore';

// 사용자 정보의 타입 정의
interface TripPlanData {
    id?: string;
    uid?: string;
    tripTitle?: string;
    tripPlan?: string;
    userPhoto?: string;
    nickname?: string;
    area?: string;
    }

    // TripPlan 컨텍스트 타입 정의
    interface TripPlanContextType {
    tripPlan: TripPlanData | null;
    }

    // TripPlan 컨텍스트 생성
    const TripPlanContext = createContext<TripPlanContextType | undefined>(undefined);

    // TripPlanProvider 컴포넌트 정의
    export function TripPlanProvider({ children }: { children: ReactNode }) {
    const [tripPlan, setTripPlan] = useState<TripPlanData | null>(null);

    useEffect(() => {
        // 사용자 인증 상태 변경 감지
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            // Firestore에서 해당 사용자의 TripPlan 정보 가져오기
            const tripRef: DocumentReference = doc(firestore, 'TripPlan', firebaseUser.uid);
            const docSnap = await getDoc(tripRef);

            if (docSnap.exists()) {
            const tripData = docSnap.data() as TripPlanData;
            setTripPlan(tripData);
            }
        } else {
            setTripPlan(null);
        }
        });

        return () => unsubscribe();
    }, []);

    // TripPlan 컨텍스트 제공
    return <TripPlanContext.Provider value={{ tripPlan }}>{children}</TripPlanContext.Provider>;
    }

    // useTripPlan 훅 정의
    export function useTripPlan() {
    const context = useContext(TripPlanContext);

    if (!context) {
        throw new Error('useTripPlan must be used within a TripPlanProvider');
    }

    return context.tripPlan;
}
