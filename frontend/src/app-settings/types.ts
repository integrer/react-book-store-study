import { AxiosInstance } from 'axios';

export interface AppSettings {
  api: () => AxiosInstance;
}
