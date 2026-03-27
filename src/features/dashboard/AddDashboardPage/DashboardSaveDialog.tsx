import React from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components';
import { Save, List, X } from 'lucide-react';
import { useTheme } from '@/hooks/theme/useTheme';
import './DashboardSaveDialog.css';

interface DashboardSaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmAndNavigate: () => void;
  onStay: () => void;
  dashboardName: string;
}

const DashboardSaveDialog: React.FC<DashboardSaveDialogProps> = ({
  isOpen,
  onClose,
  onConfirmAndNavigate,
  onStay,
  dashboardName,
}) => {
  const { theme } = useTheme();

  if (!isOpen) {
    return null;
  }

  const dialogOverlayClass = `dialog-overlay ${theme}`;

  const dialogContent = (
    <div className={dialogOverlayClass} onClick={onClose}>
      <div className="dialog-content card animate-in" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-button">
          <X size={20} />
        </button>
        <div className="dialog-body">
          <div className="success-icon-wrapper">
             <Save size={32} className="success-icon" />
          </div>
          <h3>Dashboard Saved!</h3>
          <p>
            Your dashboard <strong>"{dashboardName}"</strong> has been saved successfully. 
            What would you like to do next?
          </p>
        </div>
        <div className="dialog-footer">
          <Button onClick={onStay} variant="secondary">
            Stay and Edit
          </Button>
          <Button onClick={onConfirmAndNavigate} variant="primary" glow>
            <List size={16} />
            Go to Dashboards List
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
};

export default DashboardSaveDialog;
