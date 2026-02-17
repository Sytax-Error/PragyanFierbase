
import MockAdapter from 'axios-mock-adapter';
import type { DatasetResponse, Dataset, Column } from '../../types/dataset';
import { mockDatasets } from '../../data/mockDatasets';
import api from './axios';
import { faker } from '@faker-js/faker';

// Helper function to generate mock data based on schema
const generateMockData = (columns: Column[], numRows: number = 50): any[] => {
  const data = [];
  for (let i = 0; i < numRows; i++) {
    const row: { [key: string]: any } = {};
    columns.forEach(col => {
      switch (col.type) {
        case 'string':
          // Generate more meaningful string data based on column name
          if (col.name.toLowerCase().includes('gender')) {
            row[col.name] = faker.person.sex();
          } else if (col.name.toLowerCase().includes('name')) {
            row[col.name] = faker.person.fullName();
          } else if (col.name.toLowerCase().includes('id')) {
            row[col.name] = faker.string.uuid();
          } else {
            row[col.name] = faker.lorem.word();
          }
          break;
        case 'integer':
          row[col.name] = faker.number.int({ min: 0, max: 100 });
          break;
        case 'number':
          row[col.name] = faker.number.float({ min: 0, max: 500, precision: 0.01 });
          break;
        default:
          row[col.name] = null;
          break;
      }
    });
    data.push(row);
  }
  return data;
};


// 1. Create a mock adapter instance
const mock = new MockAdapter(api, { delayResponse: 500 });

// 2. Mock the endpoint for the list of datasets
mock.onGet('/datasets').reply(200, {
  datasets: mockDatasets,
});

// 3. Mock the endpoint for fetching specific dataset data
mock.onGet(new RegExp('/api/dataset-data/(.*)')).reply((config) => {
  const datasetName = decodeURIComponent(config.url?.split('/').pop() || '');
  const dataset = mockDatasets.find(d => d.name === datasetName);

  console.log(`Service: Mock request for dataset data: ${datasetName}`);

  if (dataset) {
    const data = generateMockData(dataset.columns);
    return [200, { data }];
  } else {
    return [404, { message: 'Dataset not found' }];
  }
});

/**
 * Fetches the list of all available datasets.
 */
export const getDatasets = async (): Promise<DatasetResponse> => {
  console.log('Service: Calling api.get(\'/datasets\')...');
  const response = await api.get<DatasetResponse>('/datasets');
  console.log('Service: Got dataset list from mock adapter.');
  return response.data;
};

/**
 * Fetches the actual data for a single dataset.
 * @param datasetName - The name of the dataset to fetch.
 */
export const getDatasetData = async (datasetName: string): Promise<{ data: any[] }> => {
  console.log(`Service: Calling api.get for data: ${datasetName}`);
  const response = await api.get<{ data: any[] }>(`/api/dataset-data/${encodeURIComponent(datasetName)}`);
  console.log(`Service: Got data for ${datasetName} from mock adapter.`);
  return response.data;
};
