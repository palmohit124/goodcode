import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Customer, CustomerList} from '../../../models/customer';
import {Logger} from '../logger';
import {ClientConfigService} from '../client-config/client-config.service';
import {LocalStorage} from '../local-storage/local-storage';
import 'rxjs/add/observable/throw';

@Injectable()
export class CustomerService {

  public static STORAGE_KEY: string = 'customerId';
  private urlPrefix: string;

  constructor(
    private http: HttpClient,
    private logger: Logger,
    private clientConfigService: ClientConfigService,
    private storage: LocalStorage) {
    this.urlPrefix = this.clientConfigService.get().baseApiUrl;
  }

  public loadCustomers(queryParamas): Observable<CustomerList> {
    return this.http.get<CustomerList>(this.urlPrefix + 'customers', {params: this.buildQueryParams(queryParamas), observe: 'response'})
      .map((response) => {
        this.logger.info('[CustomerService] Successfully loaded customers.');
        response.body.total_items = Number.parseInt(response.headers.get('X-Total-Count'));
        return response.body;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[CustomerService] Failed to load the customer.');
      });
  }

  public createCustomer(body): Observable<Customer> {
    return this.http.post<Customer>(this.urlPrefix + 'customers', body)
      .map((response) => {
        this.logger.info('[CustomerService] Successfully created customers.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[CustomerService] Failed to create the customer.');
      });
  }

  public editCustomer(id, body): Observable<Customer> {
    return this.http.put<Customer>(this.urlPrefix + 'customers/' + id, body)
      .map((response) => {
        this.logger.info('[CustomerService] Successfully edited customers.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[CustomerService] Failed to edit the customer.');
      });
  }

  public loadCustomer(id): Observable<Customer> {
    return this.http.get<Customer>(this.urlPrefix + 'customers/' + id)
      .map((response) => {
        this.logger.info('[CustomerService] Successfully loaded selected customers.');
        return response;
      }).catch((error: HttpErrorResponse) => {
        return this.handleError(error, '[CustomerService] Failed to load the selected customer.');
      });
  }

  public saveCustomerSession(selectedCustomerId: string): Observable<{}> {
    return this.storage.setItem(CustomerService.STORAGE_KEY, selectedCustomerId);
  }

  public loadCustomerSession(): Promise<Customer> {
    return new Promise<Customer>((resolve, reject) => {
      this.storage.getItem(CustomerService.STORAGE_KEY).subscribe((customerId) => {
        if (customerId === null) {
          reject('Customer session not found');
        } else {
          return this.loadCustomer(customerId).subscribe(response => {
            resolve(response);
          }, (error) => {
            reject(error);
          });
        }
      }, error => {
        reject(error);
      });
    });
  }

  private handleError(error: HttpErrorResponse, loggerMessage: string) {
    let errMsg: string;
    errMsg = `${error.status} - ${error.message || ''}`;
    this.logger.error(loggerMessage, error);
    return Observable.throw(errMsg);
  }

  private buildQueryParams(queryParamas) {
    const keys = Object.keys(queryParamas);
    let params = new HttpParams();
    keys.forEach(key => {
      params = params.append(key, queryParamas[key]);
    });
    return params;
  }
}
