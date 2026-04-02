import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { useTheme } from "@/hooks/theme/useTheme";
import "./DeleteConfirmationDialog.css";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType?: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = "item",
}) => {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  const isMatch = inputValue === itemName;

  const handleClose = () => {
    setInputValue("");
    onClose();
  };

  const handleConfirm = () => {
    if (isMatch) {
      onConfirm();
      setInputValue("");
      onClose();
    }
  };

  const capitalizedType = itemType.charAt(0).toUpperCase() + itemType.slice(1);

  const dialogContent = (
    <div className={`dd-overlay ${theme}`} onClick={handleClose}>
      <div className="dd-modal" onClick={(e) => e.stopPropagation()}>
        {/* Danger accent strip */}
        <div className="dd-accent-strip" />

        {/* Close button */}
        <button className="dd-close" onClick={handleClose} aria-label="Close">
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="dd-icon-ring">
          <AlertTriangle size={28} strokeWidth={2.5} />
        </div>

        {/* Heading */}
        <h2 className="dd-title">Delete {capitalizedType}</h2>
        <p className="dd-subtitle">
          This action is <strong>permanent</strong> and cannot be undone.
          <br />
          <span className="dd-item-name">"{itemName}"</span> will be removed
          forever.
        </p>

        {/* Divider */}
        <div className="dd-divider" />

        {/* Confirmation input */}
        <div className="dd-input-group">
          <label className="dd-label">
            Type <strong>{itemName}</strong> to confirm
          </label>
          <input
            type="text"
            className="dd-input"
            placeholder={itemName}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
          />
        </div>

        {/* Actions */}
        <div className="dd-actions">
          <button className="dd-btn dd-btn-cancel" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="dd-btn dd-btn-delete"
            onClick={handleConfirm}
            disabled={!isMatch}
          >
            <Trash2 size={15} />
            Delete {capitalizedType}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
};

export default DeleteConfirmationDialog;
