import { Trip } from '../models/trip';
import { User } from '../models/user';

export interface RootState {
  version: string;
}

export interface DashboardState {
  toggle: boolean;
  edit: {
    isEditMode: boolean;
    idInEdit: number;
    component: 'trip' | 'tripDay' | 'tripEvent';
  };
  openCreateTripDialog: boolean;
  openCreateTripDayDialog: boolean;
  openCreateEventDialog: boolean;
  currentMenu: 'upcoming' | 'current' | 'past' | 'archived';
  selectedTripDayId: number;
}

export interface AlertState {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

export interface TripState {
  isLoading: boolean;
  tripList: Trip[];
  tripDetail: Trip;
}

export interface AuthenticationState {
  status: { loggedIn: boolean };
  user: User;
}
