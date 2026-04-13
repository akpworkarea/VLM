import { MOCK_DASHBOARD } from '../mock/dashboard.mock';
import { DashboardData } from '../models/dashboard.model';

export const ENDPOINTS = {
  GET_DASHBOARD: '/student/dashboard',
  GET_LIVE_CLASSES: '/student/live',
  GET_SPIN_STATUS: '/student/spin',
};

class DashboardService {
  async getDashboardData(): Promise<DashboardData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_DASHBOARD;
  }

  async getSpinStatus() {
    return { available: false, nextSpin: MOCK_DASHBOARD.spinAvailableAt };
  }
}

export const dashboardService = new DashboardService();
