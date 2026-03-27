
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
import { MdDragIndicator } from 'react-icons/md';

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

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

const AddDashboardPage: React.FC = () => {
  const [dashboardName, setDashboardName] = useState('New Dashboard');
  const [layouts, setLayouts] = useState<{ [key: string]: LayoutItem[] }>({
    lg: [],
    md: [],
    sm: [],
    xs: [],
    xxs: [],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();
  const navigate = useNavigate();

  const availableCharts = useSelector(selectCharts);

  const onLayoutChange = (_currentLayout: Layout[], allLayouts: any) => {
    setLayouts((prevLayouts) => {
      const updatedLayouts: any = {};

      Object.keys(allLayouts).forEach((bp) => {
        updatedLayouts[bp] = allLayouts[bp].map((item: Layout) => {
          const existingItem =
            prevLayouts[bp]?.find((l) => l.i === item.i) ||
            Object.values(prevLayouts).flat().find((l) => l.i === item.i);

          return {
            ...item,
            chartId: existingItem ? existingItem.chartId : 'unknown',
          };
        });
      });

      return updatedLayouts;
    });
  };

  const handleSaveDashboard = () => {
    if (!dashboardName.trim()) {
      alert('Please enter a name for the dashboard.');
      return;
    }
    const newDashboardId = `db-${Date.now()}`;
    console.log(`Saving new dashboard: ${dashboardName} with id: ${newDashboardId} and layouts:`, layouts);
    alert(`Dashboard "${dashboardName}" and its layout saved successfully! (Simulation)`);
    navigate(`/dashboards`);
  };

  const toggleChartInGrid = (chart: ChartFromSlice) => {
    const exists = Object.values(layouts)
      .flat()
      .some((item) => item.chartId === chart.id);

    if (exists) {
      // REMOVE
      const newLayouts: any = {};
      Object.keys(layouts).forEach((bp) => {
        newLayouts[bp] = layouts[bp].filter(
          (item) => item.chartId !== chart.id
        );
      });
      setLayouts(newLayouts);
    } else {
      // ADD
      const newLayouts: any = {};
      const colsMap: any = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
      const widthMap: any = { lg: 4, md: 3, sm: 3, xs: 4, xxs: 2 };

      Object.keys(layouts).forEach((bp) => {
        const current = layouts[bp];
        const w = widthMap[bp];
        const colCount = Math.floor(colsMap[bp] / w);
        const colIndex = current.length % colCount;

        newLayouts[bp] = [
          ...current,
          {
            i: `${chart.id}-${Date.now()}`,
            chartId: chart.id,
            x: colIndex * w,
            y: Infinity,
            w,
            h: 6,
          },
        ];
      });

      setLayouts(newLayouts);
    }
  };

  const removeChartFromGrid = (itemId: string) => {
    const newLayouts: any = {};

    Object.keys(layouts).forEach((bp) => {
      newLayouts[bp] = layouts[bp].filter((item) => item.i !== itemId);
    });

    setLayouts(newLayouts);
  };
  
  const filteredCharts = useMemo(() => 
    availableCharts.filter(chart =>
        chart.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [availableCharts, searchTerm]);

  const isGridEmpty = (layouts.lg || []).length === 0;

  return (
    <div className={`${styles.addDashboardPageContainer} ${theme === 'dark' ? styles.dark : ''}`}>
      <aside className={`${styles.chartsPanel} ${isGridEmpty ? styles.disabledScroll : ''}`}>
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
            const isChartInLayout = (layouts.lg || []).some(item => item.chartId === chart.id);
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

      <main className={`${styles.dashboardCanvas} ${isGridEmpty ? styles.disabledScroll : ''}`}>
        <header className={styles.dashboardHeader}>
            <input
              type="text"
              value={dashboardName}
              onChange={(e) => setDashboardName(e.target.value)}
              placeholder="Enter Dashboard Name"
              className={styles.dashboardNameInput}
            />
          <Button onClick={handleSaveDashboard} disabled={isGridEmpty} variant="primary" glow>
            <FiSave />
            <span>Save</span>
          </Button>
        </header>

        <div className={`${styles.gridContainer} ${isGridEmpty ? styles.isEmpty : ''}`}>
          {isGridEmpty && (
            <div className={styles.emptyDashboardMessage}>
              <FiGrid className={styles.icon} />
              <h2>Empty Dashboard</h2>
              <p>Add charts from the left panel to build your dashboard.</p>
            </div>
          )}
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            onLayoutChange={onLayoutChange}
            breakpoints={breakpoints}
            cols={cols}
            rowHeight={30}
            margin={[16, 16]}
            containerPadding={[16, 16]}
            preventCollision={false}
            compactType="vertical"
            draggableHandle={`.${styles.chartDragHandle}`}
            useCSSTransforms={true}
            resizeHandles={['s', 'w', 'e', 'sw', 'se']}
          >
            {(layouts.lg || []).map((item) => (
              <div key={item.i} className={styles.gridItemWrapper}>
                <div className={styles.chartDragHandle} title="Drag to move">
                  <MdDragIndicator className={styles.dragIcon} />
                </div>
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
