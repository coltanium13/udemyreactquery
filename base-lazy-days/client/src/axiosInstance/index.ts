import axios, { AxiosRequestConfig } from 'axios';

import { User } from '../../../shared/types';
import { baseUrl } from './constants';

// had to change return type from jwtHeader to Record<string, string> which is showin in the git hub completed-apps folder. not the base one.
export function getJWTHeader(user: User): Record<string, string> {
  return { Authorization: `Bearer ${user.token}` };
}

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
