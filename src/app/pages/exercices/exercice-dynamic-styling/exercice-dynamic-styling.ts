import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';

interface Friend {
  name: string;
  age: number;
  status: 'Online' | 'Offline';
  bio: string;
  imgurl: string;
  getOneFriendStatus: () => Friend['status'];
}

@Component({
  imports: [FormsModule, NgClass, NgStyle],
  selector: 'app-exercice-dynamic-styling',
  styleUrl: './exercice-dynamic-styling.css',
  templateUrl: './exercice-dynamic-styling.html',
})
export class ExerciceDynamicStyling {
  oneFriend: Friend = {
    name: 'Sarah Michelle Gellar',
    age: 25,
    status: 'Online',
    bio: 'Global pop culture icon for her legendary role as Buffy Summers in the series Buffy the Vampire Slayer.',
    imgurl:
      'https://www.lofficiel.com/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F44039%2F1650033686-1618409627-sarah-michelle-gellar-buffy.jpeg%3Fauto%3Dformat%252Ccompress%26cs%3Dsrgb&w=2048&q=75',
    getOneFriendStatus: () => this.oneFriend.status,
  };
}
