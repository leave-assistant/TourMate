import React, { createContext, useContext, ReactNode, Dispatch, SetStateAction, useState } from 'react';
import { SearchResult } from './SearchValueType';

interface SearchContextProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchResult: SearchResult[];
  setSearchResult: Dispatch<SetStateAction<SearchResult[]>>;
  coordinates: Coordinate[];
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinate[]>>;
}

interface Coordinate {
  x: number;
  y: number;
  place_name: string;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [coordinates, setCoordinates] = useState<Array<Coordinate>>([]);

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue, searchResult, setSearchResult, coordinates, setCoordinates }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
