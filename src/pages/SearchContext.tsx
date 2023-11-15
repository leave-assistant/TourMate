// SearchContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface SearchContextProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <SearchContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext는 SearchProvider 안에서 사용되어야 합니다');
  }
  return context;
};
