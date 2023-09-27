import React from 'react';

interface ChildProps {
    data: string[];
  }

// 일정 요소 컴포넌트
const CourseElement: React.FC<ChildProps> = ({ data }) => {
  const combinedData = data.join(' - ');

  return (
    <div>
      {combinedData} {/* 결합된 문자열 출력 */}
    </div>
  );
};

export default CourseElement;
