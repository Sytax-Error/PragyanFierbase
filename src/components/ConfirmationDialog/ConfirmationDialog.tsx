import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useTheme } from "@/hooks/theme/useTheme";
import "./ConfirmationDialog.css";

interface Action {
  text: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
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
  secondaryAction,
}) => {
  const { theme } = useTheme();

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  const getButtonClass = (variant?: string) => {
    switch (variant) {
      case "primary":
        return "cd-btn cd-btn-primary";
      case "secondary":
        return "cd-btn cd-btn-secondary";
      case "danger":
        return "cd-btn cd-btn-danger";
      default:
        return "cd-btn cd-btn-primary";
    }
  };

  const dialogContent = (
    <div className={`cd-overlay ${theme}`} onClick={handleClose}>
      <div className="cd-modal" onClick={(e) => e.stopPropagation()}>
        {/* Accent strip - color based on primary action variant */}
        <div
          className={`cd-accent-strip cd-accent-${primaryAction.variant || "primary"}`}
        />

        {/* Close button */}
        <button className="cd-close" onClick={handleClose} aria-label="Close">
          <X size={18} />
        </button>

        {/* Icon */}
        {icon && <div className="cd-icon-ring">{icon}</div>}

        {/* Title & Message */}
        <h2 className="cd-title">{title}</h2>
        {message && <p className="cd-message">{message}</p>}
        {children}

        {/* Divider */}
        <div className="cd-divider" />

        {/* Actions */}
        <div className="cd-actions">
          {secondaryAction && (
            <button
              className={`cd-btn cd-btn-secondary`}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.text}
            </button>
          )}
          <button
            className={getButtonClass(primaryAction.variant)}
            onClick={primaryAction.onClick}
          >
            {primaryAction.text}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
};

export default ConfirmationDialog;
