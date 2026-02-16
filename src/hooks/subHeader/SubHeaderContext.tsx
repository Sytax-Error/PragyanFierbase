import React, { createContext, useState } from 'react';

interface SubHeaderContextType {
  subHeaderContent: React.ReactNode;
  setSubHeaderContent: (content: React.ReactNode) => void;
}

export const SubHeaderContext = createContext<SubHeaderContextType | undefined>(undefined);

export const SubHeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subHeaderContent, setSubHeaderContent] = useState<React.ReactNode>(null);

  return (
    <SubHeaderContext.Provider value={{ subHeaderContent, setSubHeaderContent }}>
      {children}
    </SubHeaderContext.Provider>
  );
};
