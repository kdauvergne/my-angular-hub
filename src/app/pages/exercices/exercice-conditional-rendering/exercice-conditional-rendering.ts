import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  imports: [NgIf],
  selector: 'app-exercice-conditional-rendering',

  templateUrl: './exercice-conditional-rendering.html',
})
export class ExerciceConditionalRendering {
  listFriendsInputText: string = '';
  listFriendsAuth: boolean = false;
  listFriendsCreationStatus: string = '🥶 Aucun ami ...';

  constructor() {
    setTimeout(() => {
      this.listFriendsAuth = true;
    }, 3000);
  }

  onUpdateFriendsList(eventInput: Event): void {
    this.listFriendsInputText = (eventInput.target as HTMLInputElement).value;
    this.listFriendsCreationStatus = `Ajout de l'ami en cours...`;
  }

  onAddingFriends(): void {
    this.listFriendsAuth = true;
    this.listFriendsCreationStatus = 'Ami ajouté';
  }
}
