import { createContext } from 'react';

export interface SubHeaderContextType {
  subHeaderContent: React.ReactNode;
  setSubHeaderContent: (content: React.ReactNode) => void;
}

export const SubHeaderContext = createContext<SubHeaderContextType | undefined>(undefined);
