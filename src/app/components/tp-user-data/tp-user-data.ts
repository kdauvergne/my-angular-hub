import { Component, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TpUserModel } from '../../models/tp-user-model';

@Component({
  imports: [FormsModule],
  selector: 'app-tp-user-data',
  styleUrl: './tp-user-data.css',
  templateUrl: './tp-user-data.html',
})
export class TpUserData {
  name = signal<string>('');
  age = signal<number>(0);

  userDataEmitUpdate = output<TpUserModel>();

  submitUser(): void {
    const newUser: TpUserModel = {
      name: this.name(),
      age: this.age(),
    };
    this.userDataEmitUpdate.emit(newUser);
  }
}
