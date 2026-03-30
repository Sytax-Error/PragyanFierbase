
import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Search, X, CheckCircle, PlusCircle, BarChart2, PieChart, Activity, List, Hash, MapPin } from 'lucide-react';
import type { Chart as ChartFromSlice } from '@/store/slices/chartSlice';
import './DashboardSidebar.css';
import { useTheme } from '@/hooks/theme/useTheme';

export const getChartIcon = (type: string) => {
    const t = (type || '').toLowerCase();
    if (t.includes('pie') || t.includes('donut')) return <PieChart size={18} />;
    if (t.includes('line') || t.includes('area') || t.includes('time')) return <Activity size={18} />;
    if (t.includes('table') || t.includes('grid')) return <List size={18} />;
    if (t.includes('number') || t.includes('stat') || t.includes('kpi') || t.includes('big')) return <Hash size={18} />;
    if (t.includes('map') || t.includes('geo')) return <MapPin size={18} />;
    return <BarChart2 size={18} />;
};

interface DashboardSidebarProps {
    availableCharts: ChartFromSlice[];
    layoutsLg: any[];
    isCollapsed: boolean;
    onToggle: () => void;
    onToggleChart: (chart: ChartFromSlice) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
    availableCharts,
    layoutsLg,
    isCollapsed,
    onToggle,
    onToggleChart
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { theme } = useTheme();

    const filteredCharts = useMemo(() =>
        availableCharts.filter((chart) =>
            chart.name.toLowerCase().includes(searchTerm.toLowerCase())
        ), [availableCharts, searchTerm]);

    return (
        <div className={`dashboard-sidebar card ${isCollapsed ? 'collapsed' : ''} `}>
            <div className="sidebar-toggle" onClick={onToggle}>
                <span className="desktop-icon">
                    {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                </span>
                <span className="mobile-icon">
                    {isCollapsed ? <ChevronUp /> : <ChevronDown />}
                </span>
            </div>

            <div className="sidebar-content">
                <h3 className={`panel-title ${theme === 'dark' ? 'dark' : 'light'}`}>Available Charts</h3>
                <div className={`search-bar ${theme === 'dark' ? 'dark' : 'light'}`}>
                    <Search className="search-icon" size={16} />
                    <input
                        type="text"
                        placeholder="Search charts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={theme === 'dark' ? 'dark' : 'light'}
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="clear-btn">
                            <X size={16} />
                        </button>
                    )}
                </div>

                <div className="sidebar-controls">
                    <div className="chart-list">
                        {filteredCharts.map((chart) => {
                            const isChartInLayout = layoutsLg.some((item: any) => item.chartId === chart.id);
                            return (
                                <div
                                    key={chart.id}
                                    className={`chart-list-item ${theme === 'dark' ? 'dark' : 'light'}`}
                                    onClick={() => onToggleChart(chart)}
                                >
                                    <span className="chart-icon">{getChartIcon(chart.chartType)}</span>
                                    <span className={`chart-name  ${theme === 'dark' ? 'dark' : 'light'}`}>{chart.name}</span>
                                    {isChartInLayout ? (
                                        <CheckCircle className="added-chart-indicator" size={20} />
                                    ) : (
                                        <PlusCircle className="add-chart-indicator" size={20} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSidebar;
