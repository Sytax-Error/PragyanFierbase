import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Responsive, WidthProvider, type Layout } from 'react-grid-layout';
import {
  FiPlusCircle,
  FiCheckCircle,
  FiX,
  FiGrid,
  FiSearch,
  FiBarChart2,
} from 'react-icons/fi';
import { MdDragIndicator } from 'react-icons/md';

import { ChartRenderer } from '@/components';
import { useTheme } from '@/hooks/theme/useTheme';
import { selectCharts, type Chart as ChartFromSlice } from '@/store/slices/chartSlice';
import {
  selectDashboards,
  setActiveEditor,
  selectActiveEditor,
  updateActiveEditor
} from '@/store/slices/dashboardSlice';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from '../AddDashboardPage/AddDashboardPage.module.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

const EditDashboardPage: React.FC = () => {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const dashboards = useSelector(selectDashboards);
  const activeEditor = useSelector(selectActiveEditor);
  const availableCharts = useSelector(selectCharts);

  const [searchTerm, setSearchTerm] = useState('');
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existingDashboard = dashboards.find((d) => d.id === dashboardId);
    if (existingDashboard) {
      dispatch(setActiveEditor(existingDashboard));
    }
    return () => {
      dispatch(setActiveEditor(null));
    };
  }, [dashboardId, dashboards, dispatch]);

  const handleResizeOrDrag = (
    _layout: Layout[], _oldItem: Layout, _newItem: Layout, _placeholder: Layout, _e: MouseEvent, element: HTMLElement
  ) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const threshold = 60;
    const scrollSpeed = 15;
    if (elementRect.bottom > containerRect.bottom - threshold) {
      container.scrollBy({ top: scrollSpeed, behavior: 'auto' });
    } else if (elementRect.top < containerRect.top + threshold) {
      container.scrollBy({ top: -scrollSpeed, behavior: 'auto' });
    }
  };

  const onLayoutChange = (_currentLayout: Layout[], allLayouts: any) => {
    if (!activeEditor) return;

    // Create new layouts object with chartId persisted
    const updatedLayouts: any = {};
    Object.keys(allLayouts).forEach((bp) => {
      updatedLayouts[bp] = allLayouts[bp].map((item: Layout) => {
        const existingItem =
          (activeEditor.layouts as any)?.[bp]?.find((l: any) => l.i === item.i) ||
          Object.values(activeEditor.layouts || {}).flat().find((l: any) => l.i === item.i);
        return {
          ...item,
          chartId: existingItem ? existingItem.chartId : 'unknown',
        };
      });
    });

    const chartsInDashboard = (updatedLayouts.lg || []).map((item: any) => item.chartId);
    dispatch(updateActiveEditor({ layouts: updatedLayouts, charts: chartsInDashboard }));
  };

  const toggleChartInGrid = (chart: ChartFromSlice) => {
    if (!activeEditor) return;
    const layouts = (activeEditor.layouts || {}) as any;
    const exists = Object.values(layouts).flat().some((item: any) => item.chartId === chart.id);

    if (exists) {
      const newLayouts: any = {};
      Object.keys(layouts).forEach((bp) => {
        newLayouts[bp] = layouts[bp].filter((item: any) => item.chartId !== chart.id);
      });
      dispatch(updateActiveEditor({
        layouts: newLayouts,
        charts: (newLayouts.lg || []).map((item: any) => item.chartId)
      }));
    } else {
      const newLayouts: any = {};
      const colsMap: any = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
      const widthMap: any = { lg: 4, md: 3, sm: 3, xs: 4, xxs: 2 };

      const breakpoints = ['lg', 'md', 'sm', 'xs', 'xxs'];
      breakpoints.forEach((bp) => {
        const current = layouts[bp] || [];
        const w = widthMap[bp];
        const colCount = Math.floor(colsMap[bp] / w);
        const colIndex = current.length % colCount;
        newLayouts[bp] = [
          ...current,
          {
            i: `${chart.id}-${Date.now()}`,
            chartId: chart.id,
            x: colIndex * w, y: Infinity, w, h: 6,
          },
        ];
      });
      dispatch(updateActiveEditor({
        layouts: newLayouts,
        charts: (newLayouts.lg || []).map((item: any) => item.chartId)
      }));
    }
  };

  const removeChartFromGrid = (itemId: string) => {
    if (!activeEditor) return;
    const layouts = (activeEditor.layouts || {}) as any;
    const newLayouts: any = {};
    Object.keys(layouts).forEach((bp) => {
      newLayouts[bp] = layouts[bp].filter((item: any) => item.i !== itemId);
    });
    dispatch(updateActiveEditor({
      layouts: newLayouts,
      charts: (newLayouts.lg || []).map((item: any) => item.chartId)
    }));
  };

  const filteredCharts = useMemo(() =>
    availableCharts.filter((chart: ChartFromSlice) =>
      chart.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [availableCharts, searchTerm]);

  const isGridEmpty = ((activeEditor?.layouts as any)?.lg || []).length === 0;

  if (!activeEditor) {
    return (
      <div className={`${styles.addDashboardPageContainer} ${theme === 'dark' ? styles.dark : ''}`}>
        <div className={styles.emptyDashboardMessage}>
          <h2>Loading Editor...</h2>
        </div>
      </div>
    );
  }

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
          {filteredCharts.map((chart: ChartFromSlice) => {
            const isChartInLayout = ((activeEditor.layouts as any)?.lg || []).some((item: any) => item.chartId === chart.id);
            return (
              <div key={chart.id} className={styles.chartListItem} onClick={() => toggleChartInGrid(chart)}>
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

      <main ref={scrollContainerRef} className={`${styles.dashboardCanvas} ${isGridEmpty ? styles.disabledScroll : ''}`}>
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
            layouts={activeEditor.layouts as any}
            onLayoutChange={onLayoutChange}
            onResize={handleResizeOrDrag}
            onDrag={handleResizeOrDrag}
            breakpoints={breakpoints}
            cols={cols}
            rowHeight={30}
            margin={[16, 16]}
            containerPadding={[0, 0]}
            draggableHandle={`.${styles.chartDragHandle}`}
            useCSSTransforms={true}
            resizeHandles={['s', 'w', 'e', 'sw', 'se']}
          >
            {((activeEditor.layouts as any)?.lg || []).map((item: any) => {
              const chart = availableCharts.find((c: ChartFromSlice) => c.id === item.chartId);
              const title = chart ? chart.name : 'Unknown Chart';
              return (
                <div key={item.i} className={styles.gridItemWrapper}>
                  <div className={styles.chartDragHandle} title="Drag to move">
                    <div className={styles.headerLeft}>
                      <MdDragIndicator className={styles.dragIcon} />
                      <span className={styles.chartTitle}>{title}</span>
                    </div>
                    <button
                      className={styles.removeChartButtonInline}
                      onClick={(e) => { e.stopPropagation(); removeChartFromGrid(item.i); }}
                      onMouseDown={(e) => e.stopPropagation()}
                      title="Remove chart"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                  <div className={styles.gridItemContent}>
                    <ChartRenderer chartId={item.chartId} mode="dashboard" hideHeader={true} />
                  </div>
                </div>
              );
            })}
          </ResponsiveGridLayout>
        </div>
      </main>
    </div>
  );
};

export default EditDashboardPage;
