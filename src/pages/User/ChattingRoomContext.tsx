import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from './firebase';
import { DocumentReference, doc, getDoc } from 'firebase/firestore';

interface RoomData {
	created_at: string;
    id: string;
    reqUid: string;
    resUid: string;
	tripPlanId: string;
}

interface RoomContextType {
	room: RoomData | null;
	}

	const RoomContext = createContext<RoomContextType | undefined>(undefined);

	export function RoomProvider({ children }: { children: ReactNode }) {
	const [room, setRoom] = useState<RoomData | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
		if (firebaseUser) {
			const roomRef: DocumentReference = doc(firestore, 'ChattingRoom', firebaseUser.uid);
			const docSnap = await getDoc(roomRef);
			if (docSnap.exists()) {
			const roomData = docSnap.data() as RoomData;
			setRoom(roomData);
			}
		} else {
			setRoom(null);
		}
		});

		return () => unsubscribe();
	}, []);

	return <RoomContext.Provider value={{ room }}>{children}</RoomContext.Provider>;
	}

	export function useRoom() {
	const context = useContext(RoomContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context.room;
}
