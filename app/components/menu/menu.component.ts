import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public appPages = [];
  constructor(private router: Router,
    private platform: Platform,
    private menu: MenuController) { }

  ngOnInit() {
    this.setAppPages();
  }

  setAppPages() {
    this.appPages = [
      {
        title: 'Customer',
        url: '/home',
        // icon: 'home'
      },
      {
        title: 'Dashboard',
        url: '/dashboard'
      },
    ];
  }

  nav(p) {
    this.router.navigate([p.url], { replaceUrl: true });
  }
}
