import { useContext } from 'react';
import { SubHeaderContext } from './SubHeaderContext';

export const useSubHeader = () => {
  const context = useContext(SubHeaderContext);
  if (!context) {
    throw new Error('useSubHeader must be used within a SubHeaderProvider');
  }
  return context;
};
