
import React from 'react';
import { Button } from '@/components';
import { Save, List, CheckCircle, X } from 'lucide-react';
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
  if (!isOpen) {
    return null;
  }

  const stayText = isEditMode ? 'Update & Stay' : 'Save & Stay';

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content card" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-button">
          <X size={20} />
        </button>
        <div className="dialog-header">
          <div className="dialog-icon-wrapper">
            <CheckCircle size={36} className="dialog-icon" />
          </div>
        </div>
        <div className="dialog-body">
          <h3>Chart Saved Successfully!</h3>
          <p>Your work has been saved. You can continue editing or return to the charts list.</p>
        </div>
        <div className="dialog-footer">
          <Button onClick={onConfirmAndStay} variant="secondary">
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
};

export default SaveConfirmationDialog;
