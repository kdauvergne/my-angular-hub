import { Component } from '@angular/core';
import { Route, RouterLink } from '@angular/router';
import { EXERCICES_ROUTES } from '../../../pages/exercices/exercices.routes';
import { LESSONS_ROUTES } from '../../../pages/lessons/lessons.routes';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  lessons: Route[] = LESSONS_ROUTES;
  exercices: Route[] = EXERCICES_ROUTES;
}
