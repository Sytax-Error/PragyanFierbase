
import React from 'react';
import { Button } from '@/components';

const SubHeaderActions: React.FC = () => {
  const handleSave = () => {
    console.log('Save button clicked!');
  };

  return (
    <div className="sub-header-actions">
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default SubHeaderActions;
