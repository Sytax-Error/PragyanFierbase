import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';

import { selectDashboards } from '@/store/slices/dashboardSlice';
import { selectCharts, type Chart as ChartFromSlice } from '@/store/slices/chartSlice';
import { Button, ChartRenderer } from '@/components';
import { useTheme } from '@/hooks/theme/useTheme';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './DashboardDetailPage.css';
import dashboardStyles from '../AddDashboardPage/AddDashboardPage.module.css';
import { BarChart2 } from 'lucide-react';

const ResponsiveGridLayout = WidthProvider(Responsive);
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

const DashboardDetailPage: React.FC = () => {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const dashboards = useSelector(selectDashboards);
  const availableCharts = useSelector(selectCharts);

  const dashboard = dashboards.find(d => d.id === dashboardId);

  if (!dashboard) {
    return (
      <div className={`dashboard-detail-page ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="error-state">
          <h2>Dashboard Not Found</h2>
          <Button onClick={() => navigate('/dashboards')}>Back to List</Button>
        </div>
      </div>
    );
  }

  const { layouts } = dashboard;

  return (
    <div className={`dashboard-detail-page ${theme === 'dark' ? 'dark' : ''}`}>
      <main className="detail-content">
        <div className={dashboardStyles.gridContainer}>
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts || {}}
            breakpoints={breakpoints}
            cols={cols}
            rowHeight={30}
            margin={[16, 16]}
            containerPadding={[0, 0]}
            isDraggable={false}
            isResizable={false}
            useCSSTransforms={true}
          >
            {(layouts?.lg || []).map((item: any) => {
              const chart = availableCharts.find((c: ChartFromSlice) => c.id === item.chartId);
              const title = chart ? chart.name : 'Unknown Chart';

              return (
                <div key={item.i} className={dashboardStyles.gridItemWrapper}>
                  <div className={dashboardStyles.chartDragHandle} style={{ cursor: 'default' }}>
                    <div className={dashboardStyles.headerLeft}>
                      <BarChart2 size={16} className="info-icon" />
                      <span className={dashboardStyles.chartTitle}>{title}</span>
                    </div>
                  </div>
                  <div className={dashboardStyles.gridItemContent}>
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

export default DashboardDetailPage;
