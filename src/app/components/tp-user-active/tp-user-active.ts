import { Component, input } from '@angular/core';
import { TpUserModel } from '../../models/tp-user-model';

@Component({
  imports: [],
  selector: 'app-tp-user-active',
  styleUrl: './tp-user-active.css',
  templateUrl: './tp-user-active.html',
})
export class TpUserActive {
  readonly activeUser = input.required<TpUserModel>();
}
