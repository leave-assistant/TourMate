import React, { useState } from 'react';

interface MemberInfo {
  name: string;
  age: string;
  gender: string;
  tourstyle: string;
  mbti: string;
  info: string;
}

const MemberEdit: React.FC = () => {
  const [memberInfo, setMemberInfo] = useState<MemberInfo>({
    name: '',
    age: '',
    gender: '',
    tourstyle: '',
    mbti: '',
    info: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setMemberInfo({
      ...memberInfo,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log('수정된 정보:', memberInfo);
  };

  return (
    <div>
      <h1>정보 수정</h1>
      <form>
      <div>
          <label>이름: </label>
          <input
            type="text"
            name="name"
            value={memberInfo.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>나이: </label>
          <input
            type="number"
            name="age"
            value={memberInfo.age}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>성별: </label>
          <input
            type="text"
            name="gender"
            value={memberInfo.gender}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>여행스타일: </label>
          <input
            type="text"
            name="tourstyle"
            value={memberInfo.tourstyle}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>MBTI: </label>
          <input
            type="text"
            name="mbti"
            value={memberInfo.mbti}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>소개글: </label>
          <input
            type="text"
            name="info"
            value={memberInfo.info}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <button onClick={handleSave}>저장</button>
    </div>
  );
};

export default MemberEdit;
