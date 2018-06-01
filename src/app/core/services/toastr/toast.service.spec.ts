import {inject, TestBed} from '@angular/core/testing';
import {ToastrModule} from 'ngx-toastr';
import {ToastService} from './toast.service';

describe('ToastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [ToastService]
    });
  });

  it('should be created', inject([ToastService], (service: ToastService) => {
    expect(service).toBeTruthy();
  }));
});
