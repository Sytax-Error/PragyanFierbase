// src/services/api/dataset.service.ts
import MockAdapter from 'axios-mock-adapter';
import type {  DatasetResponse } from '../../types/dataset';
import { mockDatasets } from '../../data/mockDatasets';
import api from './axios'; // CORRECT: Default import

// 1. Create a mock adapter instance
const mock = new MockAdapter(api, { delayResponse: 1500 });

// 2. Define the mock API endpoint
// When the service calls `api.get('/datasets')`, the mock adapter will intercept it.
mock.onGet('/datasets').reply(200, {
  datasets: mockDatasets,
});

console.log('Service: Mock adapter is set up for /datasets');

/**
 * This is the function the rest of our app will use. It now makes a real
 * (but mocked) network request, which means our interceptors will run.
 */
export const getDatasets = async (): Promise<DatasetResponse> => {
  console.log('Service: Calling api.get(\'/datasets\')...');

  // This now makes a request that the mock adapter will catch
  const response = await api.get<DatasetResponse>('/datasets');

  console.log('Service: Got response from mock adapter.');
  return response.data;
};
