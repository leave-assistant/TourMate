import { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from './firebase';

interface UserData {
  nickname?: string;
  age?: string;
  gender?: string;
  MBTI?: string;
  introduce?: string;
  tripStyle?: string;
}

function UserProfile() {
  const [newMbti, setNewMbti] = useState(''); // 사용자가 입력한 MBTI 상태 변수
  const [user, setUser] = useState<UserData | null>(null);
  const [uid, setUid] = useState<string | null>(null); // uid 상태 변수 추가

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 로그인한 경우
        const userRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
          setUid(user.uid); // uid를 설정
        } else {
          console.log('사용자 정보가 없습니다.');
        }
      } else {
        setUser(null);
        setUid(null); // 로그아웃한 경우 uid를 null로 설정
      }
    });

    return () => unsubscribe();
  }, []);

  // MBTI 업데이트 핸들러
  const handleUpdateMbti = async () => {
    if (uid && newMbti) {
      try {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', uid);

        const updatedData = {
          MBTI: newMbti,
        };

        await updateDoc(userDocRef, updatedData);
        console.log('MBTI 업데이트 성공');
        alert('MBTI 업데이트 성공');
      } catch (error) {
        console.error('MBTI 업데이트 오류:', error);
        alert('MBTI 업데이트 오류');
      }
    } else {
      alert('UID 또는 MBTI 값이 없습니다.');
    }
  };

  return (
    <div>
      <p>사용자 UID: {uid}</p>
      <input
        type="text"
        placeholder="새로운 MBTI 입력"
        value={newMbti}
        onChange={(e) => setNewMbti(e.target.value)}
      />
      <button onClick={handleUpdateMbti}>MBTI 업데이트</button>
    </div>
  );
}

export default UserProfile;
