import React, { useState } from 'react';
import { SubHeaderContext } from './SubHeaderContext';

export const SubHeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subHeaderContent, setSubHeaderContent] = useState<React.ReactNode>(null);

  return (
    <SubHeaderContext.Provider value={{ subHeaderContent, setSubHeaderContent }}>
      {children}
    </SubHeaderContext.Provider>
  );
};
