import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../../../../models/customer';
import { SearchIntegration, SearchIntegrationList, EmptySearchIntegration } from '../../../../models/search-integration';
import { getSelectedCustomers } from '../../../../core/reducers';
import { SearchAnalyticsState, getSearchIntegrationState, searchIntegration, getSearchIntegrationActionStatus } from '../../../reducers';
import { searchIntegrationActions } from '../../../actions';
import { ClientConfigService } from '../../../../core/services/client-config/client-config.service';
import { OmniConfirmationComponent } from '../../../../shared/components';

@Component({
  selector: 'omni-search-integration-list',
  templateUrl: './search-integration-list.component.html',
  styleUrls: ['./search-integration-list.component.scss']
})
export class SearchIntegrationListComponent implements OnInit, OnDestroy {
  @Output()
  integrationSelected = new EventEmitter();

  pageIndex: number = 0;
  limit: number = 5;

  confirmationDialogRefSubscription: Subscription;
  selectedCustomerSubscription: Subscription;
  selectedCustomer: Customer;

  selectedIntegration: SearchIntegration = EmptySearchIntegration;
  searchIntegrationState$: Observable<searchIntegration.SearchIntegrationState>;
  searchIntegrationSubscription: Subscription;
  removeSearchIntegrationSubscription: Subscription;
  loadIntegrationOnRemove: boolean = false;

  constructor(
    private store: Store<SearchAnalyticsState>,
    private clientConfigService: ClientConfigService,
    public dialog: MatDialog
  ) {
    this.searchIntegrationState$ = this.store.select(getSearchIntegrationState);


    this.selectedCustomerSubscription = this.store.select(getSelectedCustomers).subscribe(customer => {
      this.selectedCustomer = customer;
      if (this.selectedCustomer) {
        this.loadIntegration();
      }
    });

    this.removeSearchIntegrationSubscription = this.store.select(getSearchIntegrationActionStatus)
      .filter(searchIntegrationRemoved => searchIntegrationRemoved)
      .subscribe(() => {
        if (this.loadIntegrationOnRemove) {
          this.loadIntegrationOnRemove = false;
          this.selectedIntegration = EmptySearchIntegration;
          this.pageIndex = 0;
        }
        this.loadIntegration();
      });
  }

  ngOnInit() {
    this.searchIntegrationSubscription = this.searchIntegrationState$.subscribe(state => {
      if (state.loaded && state.searchIntegrations.integrations.length && this.selectedIntegration.id === '0') {
        this.selectedIntegration = state.searchIntegrations.integrations[0];
        this.integrationSelected.emit(this.selectedIntegration);
      }
    });
  }

  loadIntegration() {
    const queryParam = {
      offset: this.pageIndex * this.limit,
      limit: this.limit
    };
    this.store.dispatch(new searchIntegrationActions.Load(this.selectedCustomer.id, queryParam));
  }

  onIntegrationSelect(integration) {
    this.selectedIntegration = integration;
    this.integrationSelected.emit(this.selectedIntegration);
  }

  paginate(event) {
    this.pageIndex = event.pageIndex;
    this.loadIntegration();
  }

  removeIntegration(integration: SearchIntegration) {
    const dialogRef = this.dialog.open(OmniConfirmationComponent, {
      data: {
        title: 'Are you sure to remove integration?',
        content: integration.name
      }
    });

    this.confirmationDialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIntegrationOnRemove = integration.id === this.selectedIntegration.id;
        this.store.dispatch(new searchIntegrationActions.Remove(integration.href));
      }
    });
  }

  createIntegration(source) {
    this.store.dispatch(new searchIntegrationActions.Create(this.selectedCustomer.id, source, this.clientConfigService.get().oAuthConfigs.redirectUri));
  }

  ngOnDestroy() {
    if (this.selectedCustomerSubscription) {
      this.selectedCustomerSubscription.unsubscribe();
    }
    if (this.removeSearchIntegrationSubscription) {
      this.removeSearchIntegrationSubscription.unsubscribe();
    }
    if (this.confirmationDialogRefSubscription) {
      this.confirmationDialogRefSubscription.unsubscribe();
    }
    if (this.searchIntegrationSubscription) {
      this.searchIntegrationSubscription.unsubscribe();
    }
  }

}
