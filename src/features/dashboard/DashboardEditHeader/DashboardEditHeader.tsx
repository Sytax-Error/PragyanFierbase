import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiArrowLeft, FiSave, FiEdit2 } from 'react-icons/fi';
import { 
  selectActiveEditor, 
  updateActiveEditor, 
  updateDashboard,
  setActiveEditor
} from '@/store/slices/dashboardSlice';
import { Button } from '@/components';
import DashboardSaveDialog from '../AddDashboardPage/DashboardSaveDialog';
import './DashboardEditHeader.css';

const DashboardEditHeader: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeEditor = useSelector(selectActiveEditor);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = React.useState(false);

  if (!activeEditor) return null;

  const handleUpdate = () => {
    dispatch(updateDashboard({
      id: activeEditor.id,
      changes: {
        name: activeEditor.name,
        charts: activeEditor.charts,
        layouts: activeEditor.layouts,
        lastModified: new Date().toISOString(),
      }
    }));
    setIsSaveDialogOpen(true);
  };

  const handleBack = () => {
    dispatch(setActiveEditor(null));
    navigate(-1);
  };

  return (
    <div className="dashboard-edit-header-wrapper">
      <div className="header-left">
        <button className="back-btn-header" onClick={handleBack}>
          <FiArrowLeft size={18} />
        </button>
        <div className="dashboard-editable-title-container">
          <span className="dashboard-label">Dashboard:</span>
          <div className="input-group-editing">
            <input
              type="text"
              value={activeEditor.name}
              onChange={(e) => dispatch(updateActiveEditor({ name: e.target.value }))}
              placeholder="Enter Dashboard Name"
              className="dashboard-name-input-header"
            />
            <FiEdit2 size={14} className="edit-icon-pencil" />
          </div>
        </div>
      </div>
      <div className="header-right">
        <Button onClick={handleUpdate} variant="primary" glow>
          <FiSave size={16} />
          <span>Update</span>
        </Button>
      </div>
      <DashboardSaveDialog 
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        onConfirmAndNavigate={() => {
          setIsSaveDialogOpen(false);
          dispatch(setActiveEditor(null));
          navigate('/dashboards');
        }}
        onStay={() => setIsSaveDialogOpen(false)}
        dashboardName={activeEditor.name}
      />
    </div>
  );
};

export default DashboardEditHeader;
