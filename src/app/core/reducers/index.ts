import {ActionReducer, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';
import * as router from '@ngrx/router-store';
import {ROUTER_CANCEL, ROUTER_NAVIGATION} from '@ngrx/router-store';
import {RouterStateUrl} from '../../models/router-state-url';
import {environment} from '../../../environments/environment';

import * as clientConfig from './client-configuration.reducer';
import * as userProfile from './user-profile.reducer';
import * as auth from './auth.reducer';
import * as layout from './layout.reducer';
import * as customer from './customer.reducer';

import {UserProfile} from '../../models/user-profile';
import {ClientConfiguration} from '../../models/client-configuration';
import {AuthState} from '../../models/user-tokens';
import {Customer} from '../../models/customer';

export {clientConfig, userProfile, layout, customer};

export const getAuth = createFeatureSelector<AuthState>('auth');
export const getAuthAction = createSelector(getAuth, a => a.authAction);
export const getClientConfig = createFeatureSelector<ClientConfiguration>('clientConfig');
export const getProfile = createFeatureSelector<UserProfile>('profile');
export const getRouterReducer =  createFeatureSelector<router.RouterReducerState<RouterStateUrl>>('routerReducer');
export const getRouterUrl = createSelector(getRouterReducer, (state: router.RouterReducerState<RouterStateUrl>) => state);
export const getLayoutState = createFeatureSelector<layout.LayoutState>('layout');
export const getShowSidenav = createSelector( getLayoutState, (state: layout.LayoutState) => state.showSidenav);
export const getShowSpinner = createSelector( getLayoutState, (state: layout.LayoutState) => state.showSpinner);
export const getCustomerState = createFeatureSelector<customer.CustomerState>('customer');
export const getSelectedCustomers = createSelector( getCustomerState, (state: customer.CustomerState) => state.selectedCustomer);
export const getCustomerCreationStatus = createSelector( getCustomerState, (state: customer.CustomerState) => state.customerCreated);


export interface ClientState {
  routerReducer: router.RouterReducerState<RouterStateUrl>;
  auth: AuthState;
  clientConfig: ClientConfiguration;
  profile: UserProfile;
  layout: layout.LayoutState;
  customer: customer.CustomerState;
}

export const reducers = {
  routerReducer: router.routerReducer,
  auth: auth.reducer,
  clientConfig: clientConfig.reducer,
  profile: userProfile.reducer,
  layout: layout.reducer,
  customer: customer.reducer

};

export const metaReducers: MetaReducer<ClientState>[]
  = !environment.production ? [logger] : [];

export function logger(reducer: ActionReducer<ClientState>): ActionReducer<ClientState> {
  return (state: ClientState, action: any) => {

    console.log('emitted action: ' + action.type);
    if (action.type === ROUTER_NAVIGATION
      || action.type === ROUTER_CANCEL) {
      console.log(JSON.stringify(action.payload));
    }

    return reducer(state, action);
  };
}
