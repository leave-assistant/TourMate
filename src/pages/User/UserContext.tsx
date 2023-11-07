import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from './firebase';
import { DocumentReference, doc, getDoc } from 'firebase/firestore';
import { setuid } from 'process';

interface UserData {
	uid?: string;
    nickname?: string;
    age?: string;
    gender?: string;
    MBTI?: string;
    introduce?: string;
    tripStyle?: string;
}

interface UserContextType {
	user: UserData | null;
	}

	const UserContext = createContext<UserContextType | undefined>(undefined);

	export function UserProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserData | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
		if (firebaseUser) {
			const userRef: DocumentReference = doc(firestore, 'users', firebaseUser.uid);
			const docSnap = await getDoc(userRef);
			if (docSnap.exists()) {
			const userData = docSnap.data() as UserData;
			setUser(userData);
			}
		} else {
			setUser(null);
		}
		});

		return () => unsubscribe();
	}, []);

	return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
	}

	export function useUser() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context.user;
}
