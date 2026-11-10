import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-exercice-event-binding',
  templateUrl: './exercice-event-binding.html',
})
export class ExerciceEventBinding {
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
    this.listFriendsCreationStatus = 'Ami ajouté';
  }
}
