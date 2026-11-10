import { Component } from '@angular/core';

interface Friend {
  id: string;
  name: string;
  age: number;
  status: boolean;
  bio: string;
  imgurl: string;
  getOneFriendStatus: () => Friend['status'];
}

@Component({
  imports: [],
  selector: 'app-friend-card',
  styleUrl: './friend-card.css',
  templateUrl: './friend-card.html',
})
export class FriendCard {
  oneFriend: Friend = {
    id: 'SMG',
    name: 'Sarah Michelle Gellar',
    age: 49,
    status: true,
    bio: 'Global pop culture icon for her legendary role as Buffy Summers in the series Buffy the Vampire Slayer.',
    imgurl:
      'https://www.lofficiel.com/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F44039%2F1650033686-1618409627-sarah-michelle-gellar-buffy.jpeg%3Fauto%3Dformat%252Ccompress%26cs%3Dsrgb&w=2048&q=75',
    getOneFriendStatus: () => this.oneFriend.status,
  };
}
