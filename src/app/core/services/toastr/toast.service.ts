import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {

  constructor(private toastr: ToastrService) { }

  show(message: string, title: string, type: string) {
    this.toastr.show(message, title, { toastClass: type });
  }

}
