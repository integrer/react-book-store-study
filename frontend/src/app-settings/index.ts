import { AppSettings } from '~/app-settings/types';
import Axios from 'axios';
import React from 'react';

export const appSettings: AppSettings = {
  api: () => Axios.create({ baseURL: process.env.API_URL }),
};

const context = React.createContext(appSettings);
context.displayName = 'AppSettings';

export default context;
