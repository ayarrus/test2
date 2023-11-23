import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenu, MenuController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  isLoggedIn: boolean;
  @ViewChild('mainMenu', { static: true })
  mainMenu: IonMenu;
  public appPages = [];
  customBackButton: Subscription;

  constructor(private authService: AuthService,
    private router: Router,
    private platform: Platform,
    private menu: MenuController) {

    this.initializeApp();
  }

  initializeApp() {

    this.authService.isLoggedIn().then((val) => {
      this.setLoggedStatus(val);
      //this.onNotification();
    });

    this.setAppPages();
    this.openFirst();

  }

  setLoggedStatus(val) {
    this.isLoggedIn = val;
    if (!val) {
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

  async logout() {
    await this.authService.logout();

    await this.router.navigate(['/login'], { replaceUrl: true });
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

  openFirst() {
    this.menu.enable(true, 'main-content');
    this.menu.open('main-content');
  }

}
