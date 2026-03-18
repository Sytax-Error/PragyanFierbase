
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Responsive, WidthProvider, type Layout } from 'react-grid-layout';
import {
  FiPlusCircle, 
  FiCheckCircle, 
  FiSave, 
  FiX, 
  FiGrid, 
  FiSearch, 
  FiBarChart2, 
} from 'react-icons/fi';

import { Button, ChartRenderer } from '@/components';
import { useTheme } from '@/hooks/theme/useTheme';
import { selectCharts, type Chart as ChartFromSlice } from '@/store/slices/chartSlice';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './AddDashboardPage.module.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface LayoutItem extends Layout {
  chartId: string;
}

const AddDashboardPage: React.FC = () => {
  const [dashboardName, setDashboardName] = useState('New Dashboard');
  const [layout, setLayout] = useState<LayoutItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();
  const navigate = useNavigate();

  const availableCharts = useSelector(selectCharts);

  const onLayoutChange = (newLayout: Layout[]) => {
    const newLayoutItems = newLayout.map(item => {
      const existingItem = layout.find(l => l.i === item.i);
      return {
        ...item,
        chartId: existingItem ? existingItem.chartId : 'unknown',
      };
    });
    setLayout(newLayoutItems);
  };

  const handleSaveDashboard = () => {
    if (!dashboardName.trim()) {
      alert('Please enter a name for the dashboard.');
      return;
    }
    const newDashboardId = `db-${Date.now()}`;
    console.log(`Saving new dashboard: ${dashboardName} with id: ${newDashboardId} and layout:`, layout);
    alert(`Dashboard "${dashboardName}" and its layout saved successfully! (Simulation)`);
    navigate(`/dashboards`);
  };

  const toggleChartInGrid = (chart: ChartFromSlice) => {
    const isChartInLayout = layout.some(item => item.chartId === chart.id);

    if (isChartInLayout) {
      const itemToRemove = layout.find(item => item.chartId === chart.id);
      if (itemToRemove) {
        setLayout(layout.filter(item => item.i !== itemToRemove.i));
      }
    } else {
      const newGridItem: LayoutItem = {
        i: `${chart.id}-${Date.now()}`,
        chartId: chart.id,
        x: (layout.length * 4) % 12, 
        y: Infinity, 
        w: 4, 
        h: 3, 
      };
      setLayout([...layout, newGridItem]);
    }
  };

  const removeChartFromGrid = (itemId: string) => {
    setLayout(layout.filter(item => item.i !== itemId));
  };

  const filteredCharts = useMemo(() => 
    availableCharts.filter(chart =>
        chart.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [availableCharts, searchTerm]);

  return (
    <div className={`${styles.addDashboardPageContainer} ${theme === 'dark' ? styles.dark : ''}`}>
      <aside className={`${styles.chartsPanel} ${layout.length === 0 ? styles.disabledScroll : ''}`}>
        <h3 className={styles.panelTitle}>Available Charts</h3>
        <div className={styles.searchBar}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search charts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className={styles.clearBtn}>
              <FiX />
            </button>
          )}
        </div>
        <div className={styles.chartList}>
          {filteredCharts.map(chart => {
            const isChartInLayout = layout.some(item => item.chartId === chart.id);
            return (
              <div 
                key={chart.id} 
                className={styles.chartListItem}
                onClick={() => toggleChartInGrid(chart)}
              >
                <FiBarChart2 />
                <span>{chart.name}</span>
                {isChartInLayout ? (
                  <FiCheckCircle className={styles.addedChartIndicator} />
                ) : (
                  <FiPlusCircle className={styles.addChartIndicator} />
                )}
              </div>
            );
          })}
        </div>
      </aside>

      <main className={`${styles.dashboardCanvas} ${layout.length === 0 ? styles.disabledScroll : ''}`}>
        <header className={styles.dashboardHeader}>
            <input
              type="text"
              value={dashboardName}
              onChange={(e) => setDashboardName(e.target.value)}
              placeholder="Enter Dashboard Name"
              className={styles.dashboardNameInput}
            />
          <Button onClick={handleSaveDashboard} disabled={layout.length === 0} variant="primary" glow>
            <FiSave />
            <span>Save</span>
          </Button>
        </header>

        <div className={`${styles.gridContainer} ${layout.length === 0 ? styles.isEmpty : ''}`}>
          {layout.length === 0 && (
            <div className={styles.emptyDashboardMessage}>
              <FiGrid className={styles.icon} />
              <h2>Empty Dashboard</h2>
              <p>Add charts from the left panel to build your dashboard.</p>
            </div>
          )}
            <ResponsiveGridLayout
              layouts={{ lg: layout }}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
              rowHeight={100}
              onLayoutChange={onLayoutChange}
              draggableHandle={`.${styles.gridItemContent}`}
              compactType="vertical"
              useCSSTransforms={true}
              className="layout"
            >
              {layout.map((item) => (
                <div key={item.i} className={styles.gridItemWrapper}>
                  <div className={styles.gridItemContent}>
                    <ChartRenderer chartId={item.chartId} mode="dashboard" />
                  </div>
                  <button 
                    className={styles.removeChartButton}
                    onClick={() => removeChartFromGrid(item.i)}
                    title="Remove chart"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              ))}
            </ResponsiveGridLayout>
        </div>
      </main>
    </div>
  );
};

export default AddDashboardPage;
