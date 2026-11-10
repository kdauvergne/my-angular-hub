import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendCard } from '../../../components/friend-card/friend-card';

@Component({
  imports: [FormsModule, FriendCard, NgFor],
  selector: 'app-exercice-list-rendering',
  styleUrl: './exercice-list-rendering.css',
  templateUrl: './exercice-list-rendering.html',
})
export class ExerciceListRendering {
  inputNameFriend = '';

  userProfiles = [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Michelle Gellar',
      email: 'sarah.gellar@example.com',
      isActive: true,
      role: 'Admin',
    },
  ];

  addAFriend(): void {
    this.userProfiles.push({
      id: Date.now(),
      firstName: this.inputNameFriend,
      lastName: '',
      email: '',
      isActive: true,
      role: 'Membre',
    });
  }
}
