
import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from '@/components';
import { useTheme } from '@/hooks/theme/useTheme';
import './ConfirmationDialog.css';

interface Action {
  text: React.ReactNode;
  onClick: () => void;
}

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  primaryAction: Action;
  secondaryAction?: Action;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  message,
  children,
  icon, 
  primaryAction, 
  secondaryAction 
}) => {
  const { theme } = useTheme();

  if (!isOpen) {
    return null;
  }

  const dialogOverlayClass = `dialog-overlay ${theme}`;

  const dialogContent = (
    <div className={dialogOverlayClass} onClick={onClose}>
      <div className="dialog-content card" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-button">
          <X size={24} />
        </button>
        <div className="dialog-body">
          {icon && <div className="dialog-icon-wrapper">{icon}</div>}
          <h3>{title}</h3>
          {message && <p>{message}</p>}
          {children}
        </div>
        <div className="dialog-actions">
          {secondaryAction && (
            <Button variant="secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.text}
            </Button>
          )}
          <Button variant="primary" onClick={primaryAction.onClick}>
            {primaryAction.text}
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
};

export default ConfirmationDialog;
