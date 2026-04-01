
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiArrowLeft, FiSave, FiEdit2 } from 'react-icons/fi';
import {
  selectActiveEditor,
  updateActiveEditor,
  addDashboard,
  setActiveEditor
} from '@/store/slices/dashboardSlice';
import { Button, ConfirmationDialog } from '@/components';
import '../DashboardEditHeader/DashboardEditHeader.css';
import { useTheme } from '@/hooks/theme/useTheme';
import { List, Save } from 'lucide-react';

const DashboardAddHeader: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeEditor = useSelector(selectActiveEditor);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = React.useState(false);
  const { theme } = useTheme();

  if (!activeEditor) return null;

  const handleSave = () => {
    if (!activeEditor.name.trim()) {
      alert('Please enter a name for the dashboard.');
      return;
    }

    dispatch(addDashboard({
      ...activeEditor,
      lastModified: new Date().toISOString(),
    }));
    setIsSaveDialogOpen(true);
  };

  const handleBack = () => {
    dispatch(setActiveEditor(null));
    navigate(-1);
  };

  return (
    <div className="dashboard-edit-header-wrapper w-full">
      <div className="header-left">
        <button className="back-btn-header" onClick={handleBack}>
          <FiArrowLeft size={18} />
        </button>
        <div className="dashboard-editable-title-container">
          <span className="dashboard-label">New Dashboard:</span>
          <div className="input-group-editing">
            <input
              type="text"
              value={activeEditor.name}
              onChange={(e) => dispatch(updateActiveEditor({ name: e.target.value }))}
              placeholder="Enter Dashboard Name"
              className={`dashboard-name-input-header ${theme === 'dark' ? 'dark' : 'light'}`}
            />
            <FiEdit2 size={14} className="edit-icon-pencil" />
          </div>
        </div>
      </div>
      <div className="header-right">
        <Button onClick={handleSave} variant="primary" glow disabled={activeEditor.charts.length === 0}>
          <FiSave size={16} />
          <span>Save Dashboard</span>
        </Button>
      </div>
      <ConfirmationDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        title="Dashboard Saved!"
        message={`Your dashboard "${activeEditor.name}" has been saved successfully. What would you like to do next?`}
        icon={<Save size={32} className="success-icon" />}
        primaryAction={{
          text: <><List size={16} /> Go to Dashboards List</>,
          onClick: () => {
            setIsSaveDialogOpen(false);
            dispatch(setActiveEditor(null));
            navigate('/dashboards');
          }
        }}
        secondaryAction={{
          text: "Stay and Edit",
          onClick: () => setIsSaveDialogOpen(false)
        }}
      />
    </div>
  );
};

export default DashboardAddHeader;
