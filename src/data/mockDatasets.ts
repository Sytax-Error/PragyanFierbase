// src/data/mockDatasets.ts

/**
 * This file contains mock data for datasets to be used in testing and development.
 */

import type { Dataset } from '../types/dataset';

export const mockDatasets: Dataset[] = [
  {
    id: '1',
    name: 'Customer Churn',
    description: 'A dataset of customer churn data for a telecom company.',
    columns: [
      { name: 'customerID', type: 'string' },
      { name: 'gender', type: 'string' },
      { name: 'SeniorCitizen', type: 'integer' },
      { name: 'Partner', type: 'string' },
      { name: 'Dependents', type: 'string' },
      { name: 'tenure', type: 'integer' },
      { name: 'PhoneService', type: 'string' },
      { name: 'MultipleLines', type: 'string' },
      { name: 'InternetService', type: 'string' },
      { name: 'OnlineSecurity', type: 'string' },
      { name: 'OnlineBackup', type: 'string' },
      { name: 'DeviceProtection', type: 'string' },
      { name: 'TechSupport', type: 'string' },
      { name: 'StreamingTV', type: 'string' },
      { name: 'StreamingMovies', type: 'string' },
      { name: 'Contract', type: 'string' },
      { name: 'PaperlessBilling', type: 'string' },
      { name: 'PaymentMethod', type: 'string' },
      { name: 'MonthlyCharges', type: 'number' },
      { name: 'TotalCharges', type: 'number' },
      { name: 'Churn', type: 'string' },
    ],
  },
  {
    id: '2',
    name: 'Iris Flower',
    description: 'A dataset of measurements of iris flowers.',
    columns: [
      { name: 'sepal_length', type: 'number' },
      { name: 'sepal_width', type: 'number' },
      { name: 'petal_length', type: 'number' },
      { name: 'petal_width', type: 'number' },
      { name: 'species', type: 'string' },
    ],
  },
];
