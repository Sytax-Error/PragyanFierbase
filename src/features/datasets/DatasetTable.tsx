import React from 'react';
import '@/features/datasets/DatasetTable.css';

const sampleData = {
  columns: ['ID', 'Name', 'Age', 'City'],
  rows: [
    [1, 'Alice', 30, 'New York'],
    [2, 'Bob', 25, 'Los Angeles'],
    [3, 'Charlie', 35, 'Chicago'],
    [4, 'David', 28, 'Houston'],
  ],
};

const DatasetTable: React.FC = () => {
  return (
    <div className="dataset-table-container">
      <h2>Sample Dataset</h2>
      <table className="dataset-table">
        <thead>
          <tr>
            {sampleData.columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sampleData.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatasetTable;
