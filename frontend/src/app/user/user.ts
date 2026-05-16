import { Component } from '@angular/core';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { Registration } from './registration/registration';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [Registration, RouterOutlet],
  templateUrl: './user.html',
  styles: ``,
  animations: [
    trigger('routerFadeIn', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class User {

  constructor(private context: ChildrenOutletContexts) { }

  getRouteUrl() {
    return this.context.getContext('primary')?.route?.url;
  }
}
