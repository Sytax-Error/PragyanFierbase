import React from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components';
import { Save, List, X } from 'lucide-react';
import { useTheme } from '@/hooks/theme/useTheme'; // 1. Import the useTheme hook
import './SaveConfirmationDialog.css';

interface SaveConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmAndNavigate: () => void;
  onConfirmAndStay: () => void;
  isEditMode: boolean;
}

const SaveConfirmationDialog: React.FC<SaveConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirmAndNavigate,
  onConfirmAndStay,
  isEditMode,
}) => {
  const { theme } = useTheme(); // 2. Get the current theme

  if (!isOpen) {
    return null;
  }

  const headingText = isEditMode ? 'Chart Updated Successfully!' : 'Chart Saved Successfully!';
  const paragraphText = isEditMode
    ? 'Your changes have been saved. You can continue editing or return to the charts list.'
    : 'Your new chart has been saved. You can view it in the charts list or stay to create another.';
  const stayText = isEditMode ? 'Continue Editing' : 'Save & Create Another';

  // 3. Dynamically apply the theme class to the outermost element
  const dialogOverlayClass = `dialog-overlay ${theme}`;

  const dialogContent = (
    <div className={dialogOverlayClass} onClick={onClose}>
      <div className="dialog-content card" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-button">
          <X size={24} />
        </button>
        <div className="dialog-body">
          <h3>{headingText}</h3>
          <p>{paragraphText}</p>
        </div>
        <div className="dialog-footer">
          <Button onClick={onConfirmAndStay}>
            <Save size={16} />
            {stayText}
          </Button>
          <Button onClick={onConfirmAndNavigate}>
            <List size={16} />
            Go to Charts List
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
};

export default SaveConfirmationDialog;
