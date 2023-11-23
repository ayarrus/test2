import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { SupportServices } from '../shared/services/support.service';
import { DevicesActivity } from '../shared/types/YaleConnect.Types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  Last24Hs: number = 0;
  Online: number = 0;
  OfflineLast5Mins: number = 0;
  OfflineMoreThan5Mins: number = 0;
  triggerInterval: any;

  constructor(private supportService: SupportServices,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    if (!this.triggerInterval) {

      this.DeviceActivitys();

      this.triggerInterval = setInterval(async () => {
        this.DeviceActivitys();
      }
        , 30000
      )
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.triggerInterval);
  }

  async DeviceActivitys() {
    await this.supportService.getDevicesActivity().subscribe((res: DevicesActivity) => {
      this.Last24Hs = res.last24Hs;
      this.Online = res.online;
      this.OfflineLast5Mins = res.offlineLast5Mins;
      this.OfflineMoreThan5Mins = res.offlineMoreThan5Mins;
    });
  }

  async logout() {
    await this.authService.logout();

    await this.router.navigate(['/login'], { replaceUrl: true });
  }
}
