import React, { createContext, useContext, ReactNode, Dispatch, SetStateAction, useState } from 'react';
import { SearchResult } from './SearchValueType';

interface SearchContextProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchResult: SearchResult[];
  setSearchResult: Dispatch<SetStateAction<SearchResult[]>>;
  coordinates: Coordinate[];
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinate[]>>;
  checkPointCoordinates: Coordinate[];
  setCheckPointCoordinates: React.Dispatch<React.SetStateAction<Coordinate[]>>;
}

interface Coordinate {
  x: number;
  y: number;
  place_name: string;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchValue, setSearchValue] = useState<string>('대림대');
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [coordinates, setCoordinates] = useState<Array<Coordinate>>([]);
  const [checkPointCoordinates, setCheckPointCoordinates] = useState<Array<Coordinate>>([]);

  return (
    <SearchContext.Provider value={{ 
      searchValue, setSearchValue, searchResult, setSearchResult, 
      coordinates, setCoordinates, checkPointCoordinates, setCheckPointCoordinates }}>
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
