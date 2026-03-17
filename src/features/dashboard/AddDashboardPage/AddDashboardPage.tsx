
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import { Button } from '@/components';
import { useTheme } from '@/hooks/theme/useTheme';
import { vizRegistry } from '@/core/visualization';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './AddDashboardPage.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Chart {
  id: string;
  name: string;
  type: string;
}

const ChartComponent = ({ chart }: { chart: Chart }) => {
  const plugin = vizRegistry.get(chart.type);
  const thumbnail = plugin?.metadata.thumbnail || '';

  return (
    <div className="chart-placeholder">
      <img src={thumbnail} alt={chart.name} style={{ width: '80px', height: 'auto', marginBottom: '10px' }} />
      <h4>{chart.name}</h4>
    </div>
  );
};

interface LayoutItem extends Layout {
  chartId: string;
}

const AddDashboardPage: React.FC = () => {
  const [dashboardName, setDashboardName] = useState('New Dashboard');
  const [availableCharts, setAvailableCharts] = useState<Chart[]>([]);
  const [layout, setLayout] = useState<LayoutItem[]>([]);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const chartsFromRegistry = vizRegistry.list().map(plugin => ({
      id: plugin.type,
      name: plugin.metadata.name,
      type: plugin.type,
    }));
    setAvailableCharts(chartsFromRegistry);
  }, []);

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

  const addChartToGrid = (chart: Chart) => {
    const isChartInLayout = layout.some(item => item.chartId === chart.id);
    if (isChartInLayout) return;

    const newGridItem: LayoutItem = {
      i: `${chart.id}-${Date.now()}`,
      chartId: chart.id,
      x: (layout.length * 4) % 12, 
      y: Infinity, 
      w: 4,
      h: 3,
    };
    setLayout([...layout, newGridItem]);
  };

  const removeChartFromGrid = (itemId: string) => {
    setLayout(layout.filter(item => item.i !== itemId));
  };

  return (
    <div className={`add-dashboard-page-container ${theme}`}>
      <aside className="charts-panel">
        <h3>Available Charts</h3>
        <div className="chart-list">
          {availableCharts.map(chart => {
            const isChartInLayout = layout.some(item => item.chartId === chart.id);
            return (
              <div key={chart.id} className="chart-list-item">
                <p>{chart.name}</p>
                <Button 
                  onClick={() => addChartToGrid(chart)} 
                  className="btn-add-chart"
                  disabled={isChartInLayout}
                >
                  {isChartInLayout ? 'Added' : 'Add'}
                </Button>
              </div>
            );
          })}
        </div>
      </aside>

      <main className="dashboard-canvas">
        <div className="dashboard-header">
          <input
            type="text"
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
            placeholder="Enter Dashboard Name"
            className="dashboard-name-input"
          />
          <Button onClick={handleSaveDashboard} disabled={layout.length === 0}>
            Save Dashboard
          </Button>
        </div>

        <div className="grid-container">
            <ResponsiveGridLayout
                layouts={{ lg: layout }}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={100}
                onLayoutChange={onLayoutChange}
                isDraggable={true}
                isResizable={true}
                compactType="vertical"
            >
                {layout.map((item) => {
                const chart = availableCharts.find(c => c.id === item.chartId);
                return (
                    <div key={item.i} className="grid-item">
                        <button 
                            className="remove-chart-button"
                            onClick={() => removeChartFromGrid(item.i)}
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            &times;
                        </button>
                        {chart ? <ChartComponent chart={chart} /> : <p>Chart not found</p>}
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
