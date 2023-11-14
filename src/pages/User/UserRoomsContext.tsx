import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from './firebase';
import { DocumentReference, Timestamp, doc, getDoc } from 'firebase/firestore';

// 사용자 정보의 타입 정의
interface UserRoomsData {
    id?: string;
    uid?: string;
    lastMessage?: string;
    profileImg?: string;
    roomId?: string;
    updated_at?: Timestamp;
    }

    // UserRooms 컨텍스트 타입 정의
    interface UserRoomsContextType {
        userRooms: UserRoomsData | null;
    }

    // UserRooms 컨텍스트 생성
    const UserRoomsContext = createContext<UserRoomsContextType | undefined>(undefined);

    // UserRoomsProvider 컴포넌트 정의
    export function UserRoomsProvider({ children }: { children: ReactNode }) {
    const [userRooms, setUserRooms] = useState<UserRoomsData | null>(null);

    useEffect(() => {
        // 사용자 인증 상태 변경 감지
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            // Firestore에서 해당 사용자의 UserRooms 정보 가져오기
            const userRoomsRef: DocumentReference = doc(firestore, 'UserRooms', firebaseUser.uid);
            const docSnap = await getDoc(userRoomsRef);

            if (docSnap.exists()) {
                const userRoomsData = docSnap.data() as UserRoomsData;
                setUserRooms(userRoomsData);
            }
        } else {
            setUserRooms(null);
        }
        });
        return () => unsubscribe();
    }, []);

    // UserRooms 컨텍스트 제공
    return <UserRoomsContext.Provider value={{ userRooms }}>{children}</UserRoomsContext.Provider>;
    }

    // useUserRooms 훅 정의
    export function useUserRooms() {
    const context = useContext(UserRoomsContext);

    if (!context) {
        throw new Error('useTripPlan must be used within a TripPlanProvider');
    }

    return context.userRooms;
}
