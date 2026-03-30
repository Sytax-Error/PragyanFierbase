import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Responsive, WidthProvider, type Layout } from 'react-grid-layout';
import {
  FiX,
  FiGrid,
} from 'react-icons/fi';
import { MdDragIndicator } from 'react-icons/md';

import { ChartRenderer } from '@/components';
import { useTheme } from '@/hooks/theme/useTheme';
import { selectCharts, type Chart as ChartFromSlice } from '@/store/slices/chartSlice';
import DashboardSidebar from '../components/DashboardSidebar/DashboardSidebar';
import {
  setActiveEditor,
  selectActiveEditor,
  updateActiveEditor
} from '@/store/slices/dashboardSlice';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './AddDashboardPage.module.css';

const ResponsiveGridLayout = WidthProvider(Responsive);


const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

const AddDashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const activeEditor = useSelector(selectActiveEditor);
  const availableCharts = useSelector(selectCharts);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { theme } = useTheme();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  // Initialize active editor if null
  useEffect(() => {
    if (!activeEditor) {
      dispatch(setActiveEditor({
        id: `db-${Date.now()}`,
        name: 'New Dashboard',
        description: '',
        charts: [],
        layouts: { lg: [], md: [], sm: [], xs: [], xxs: [] },
        tags: [],
        owner: 'Admin',
        lastModified: new Date().toISOString(),
      }));
    }
  }, [activeEditor, dispatch]);


  const handleResizeOrDrag = (
    _layout: Layout[],
    _oldItem: Layout,
    _newItem: Layout,
    _placeholder: Layout,
    _e: MouseEvent,
    element: HTMLElement
  ) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const threshold = 60;
    const scrollSpeed = 15;

    // Scroll down if resizing/dragging near bottom
    if (elementRect.bottom > containerRect.bottom - threshold) {
      container.scrollBy({ top: scrollSpeed, behavior: 'auto' });
    }
    // Scroll up if resizing/dragging near top
    else if (elementRect.top < containerRect.top + threshold) {
      container.scrollBy({ top: -scrollSpeed, behavior: 'auto' });
    }
  };

  const onLayoutChange = (_currentLayout: Layout[], allLayouts: any) => {
    const updatedLayouts: any = {};
    Object.keys(allLayouts).forEach((bp) => {
      updatedLayouts[bp] = allLayouts[bp].map((item: Layout) => {
        const existingItem =
          layouts[bp]?.find((l: any) => l.i === item.i) ||
          Object.values(layouts).flat().find((l: any) => l.i === item.i);

        return {
          ...item,
          chartId: existingItem ? (existingItem as any).chartId : 'unknown',
        };
      });
    });

    dispatch(updateActiveEditor({
      layouts: updatedLayouts,
      charts: (updatedLayouts.lg || []).map((item: any) => item.chartId)
    }));
  };

  const toggleChartInGrid = (chart: ChartFromSlice) => {
    const exists = Object.values(layouts)
      .flat()
      .some((item: any) => item.chartId === chart.id);

    if (exists) {
      // REMOVE
      const newLayouts: any = {};
      Object.keys(layouts).forEach((bp) => {
        newLayouts[bp] = (layouts[bp] as any[]).filter(
          (item) => item.chartId !== chart.id
        );
      });
      dispatch(updateActiveEditor({
        layouts: newLayouts,
        charts: (newLayouts.lg || []).map((item: any) => item.chartId)
      }));
    } else {
      // ADD
      const newLayouts: any = {};
      const colsMap: any = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
      const widthMap: any = { lg: 4, md: 3, sm: 3, xs: 4, xxs: 2 };

      Object.keys(layouts).forEach((bp) => {
        const current = (layouts[bp] as any[]) || [];
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

      dispatch(updateActiveEditor({
        layouts: newLayouts,
        charts: (newLayouts.lg || []).map((item: any) => item.chartId)
      }));
    }
  };

  const removeChartFromGrid = (itemId: string) => {
    const newLayouts: any = {};
    Object.keys(layouts).forEach((bp) => {
      newLayouts[bp] = (layouts[bp] as any[]).filter((item) => item.i !== itemId);
    });
    dispatch(updateActiveEditor({
      layouts: newLayouts,
      charts: (newLayouts.lg || []).map((item: any) => item.chartId)
    }));
  };

  if (!activeEditor) return <div className={styles.loading}>Loading...</div>;

  const layouts = activeEditor.layouts || { lg: [], md: [], sm: [], xs: [], xxs: [] };
  const isGridEmpty = (layouts.lg || []).length === 0;

  return (
    <div className={`${styles.addDashboardPageContainer} ${theme === 'dark' ? styles.dark : ''} ${isSidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
      <DashboardSidebar
        availableCharts={availableCharts}
        layoutsLg={layouts.lg || []}
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        onToggleChart={toggleChartInGrid}
      />

      <main
        ref={scrollContainerRef}
        className={`${styles.dashboardCanvas} card ${isGridEmpty ? styles.disabledScroll : ''}`}
      >
        {/* Header removed - now in SubHeader */}
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
            onResize={handleResizeOrDrag}
            onDrag={handleResizeOrDrag}
            breakpoints={breakpoints}
            cols={cols}
            rowHeight={30}
            margin={[16, 16]}
            containerPadding={[0, 0]}
            preventCollision={false}
            compactType="vertical"
            draggableHandle={`.${styles.chartDragHandle}`}
            useCSSTransforms={true}
            resizeHandles={['s', 'w', 'e', 'sw', 'se']}
          >
            {(layouts.lg || []).map((item: any) => {
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
                      onClick={(e) => {
                        e.stopPropagation();
                        removeChartFromGrid(item.i);
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      title="Remove chart"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                  <div className={styles.gridItemContent}>
                    <ChartRenderer
                      chartId={item.chartId}
                      mode="dashboard"
                      hideHeader={true}
                    />
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

export default AddDashboardPage;
