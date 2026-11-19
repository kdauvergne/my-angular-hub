import { Component, signal } from '@angular/core';
import { TpUserActive } from '../../../components/tp-user-active/tp-user-active';
import { TpUserData } from '../../../components/tp-user-data/tp-user-data';
import { TpUserModel } from '../../../models/tp-user-model';

@Component({
  imports: [TpUserActive, TpUserData],
  selector: 'app-tp-component-communication',
  styleUrl: './tp-component-communication.css',
  templateUrl: './tp-component-communication.html',
})
export class TpComponentCommunication {
  activeUser = signal<TpUserModel>({ name: 'Alice', age: 25 });

  updateUser(user: TpUserModel): void {
    this.activeUser.set(user);
  }
}
