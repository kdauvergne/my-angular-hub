import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Friend {
  name: string;
  age: number;
  status: 'Online' | 'Offline';
  bio: string;
  imgurl: string;
  getOneFriendStatus: () => Friend['status'];
}

@Component({
  imports: [FormsModule],
  selector: 'app-exercice-two-way-binding',
  styleUrl: './exercice-two-way-binding.css',
  templateUrl: './exercice-two-way-binding.html',
})
export class ExerciceTwoWayBinding {
  oneFriend: Friend = {
    name: 'Sarah Michelle Gellar',
    age: 49,
    status: 'Online',
    bio: 'Global pop culture icon for her legendary role as Buffy Summers in the series Buffy the Vampire Slayer.',
    imgurl:
      'https://www.lofficiel.com/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F44039%2F1650033686-1618409627-sarah-michelle-gellar-buffy.jpeg%3Fauto%3Dformat%252Ccompress%26cs%3Dsrgb&w=2048&q=75',
    getOneFriendStatus: () => this.oneFriend.status,
  };
}
