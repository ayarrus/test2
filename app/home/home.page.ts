import { Component, ViewChild, OnInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

import { SupportServices } from '../shared/services/support.service';
import { Devices, Account, SupportType, Home, Hubs, Guest, Communication, RateAppScore, AccessControlEntries } from '../shared/types/Support.Types';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { DevicesActivity } from '../shared/types/YaleConnect.Types';


const ELEMENT_DATA_ACCOUNTS: Account[] = [];
const ELEMENT_DATA_HOMES: Home[] = [];
const ELEMENT_DATA_HUBS: Hubs[] = [];
const ELEMENT_DATA_DEVICES: Devices[] = [];
const ELEMENT_DATA_GUEST: Guest[] = [];
const ELEMENT_DATA_COMMUNICATON: Communication[] = [];
const ELEMENT_DATA_RATESCORE: RateAppScore[] = [];
const ELEMENT_DATA_ACCESSCONTROLENTRIES: AccessControlEntries[] = [];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {

  emailFormControl: string = ""; //= new FormControl('', [Validators.email]);
  MAC: string = "";
  formStatus: number = 0;
  supportType2 = new SupportType();
  filterxHome: string;
  filterHomeInput: string;
  filterHubsInput: string;
  filterDevicesInput: string;
  filterGuestsInput: string;
  filterRatescoreInput: string;
  filterCommunicationInput: string;
  filterAccessEntriesInput: string;
  filterxHub: string;
  filterxEndpoint: string;
  hubsFilter: Hubs[];
  listEmails: string[] = [""];
  progressBar: boolean = false;
  Last24Hs: number = 0;
  Online: number = 0;
  OfflineLast5Mins: number = 0;
  OfflineMoreThan5Mins: number = 0;
  accountID: number = 0;
  accountEmail: string = '';
  searchAccount: boolean = false;
  // rate: number = 7.3;
  // max: number = 10;

  displayedColumnsAccount: string[] = ['accountID', 'email', 'nombre', 'apellido', 'activatedOn', 'enabled', 'reenviar'];
  dsAccounts = new MatTableDataSource<Account>(ELEMENT_DATA_ACCOUNTS);
  dsAccountsCopy = ELEMENT_DATA_ACCOUNTS;

  displayedColumnsHomes: string[] = ['homeID', 'homeName', 'creationDateLocal', 'timeZoneDescription', 'offSet'];
  dsHomes = new MatTableDataSource<Home>(ELEMENT_DATA_HOMES);
  dsHomesCopy = ELEMENT_DATA_HOMES;

  displayedColumnsHubs: string[] = ['deviceID', 'homeName', 'deviceName', 'model', 'creationDateLocal', 'mac', 'currentFirmwareVersion', 'lastestVersion', 'lastReportedActivity', 'colorActivity']; //, 'lastActivityLocal'
  dsHubs = new MatTableDataSource<Hubs>(ELEMENT_DATA_HUBS);
  dsHubsCopy = ELEMENT_DATA_HUBS;

  displayedColumnsDevices: string[] = ['endPointID', 'home', 'hub', 'endpointModel', 'endPoint', 'endPointAddress', 'state', 'lastReportedActivity', 'colorActivity']; //al lado de status , 'battery' , 'dateTimeCreatedLocal'
  dsDevices = new MatTableDataSource<Devices>(ELEMENT_DATA_DEVICES);
  dsDevicesCopy = ELEMENT_DATA_DEVICES;

  displayedColumnsGuests: string[] = ['userID', 'home', 'email', 'guestName', 'endPointName', 'createdOnLocal', 'fromDateLocalFromTime', 'toDateLocalToTime', 'd', 'l', 'm', 'mi', 'j', 'v', 's'];
  dsGuests = new MatTableDataSource<Guest>(ELEMENT_DATA_GUEST);
  dsGuestsCopy = ELEMENT_DATA_GUEST;

  displayedColumnsCommunication: string[] = ['acSynch_ID', 'thread', 'oper', 'type', 'role', 'user', 'endpoint', 'lastEndpointActivity', 'colorActivityEPA', 'attempts', 'createdDateLocal', 'retryDateLocal', 'completedDateLocal', 'elapsedTime', 'colorActivity'];
  dsCommunication = new MatTableDataSource<Communication>(ELEMENT_DATA_COMMUNICATON);
  dsCommunicationCopy = ELEMENT_DATA_COMMUNICATON;

  displayedColumnsRateScore: string[] = ['description', 'score', 'rateUTCDateTime'];
  dsRateScore = new MatTableDataSource<RateAppScore>(ELEMENT_DATA_RATESCORE);
  dsRateScoreCopy = ELEMENT_DATA_RATESCORE;

  displayedColumnsAccessControlEntries: string[] = ['accessControlEntryID', 'endpointID', 'statusDescription', 'reasonDescription', 'sourceDescription', 'eventDateTimeLocalTime', 'userName', 'endpointDescription'];
  dsAccessControlEntries = new MatTableDataSource<AccessControlEntries>(ELEMENT_DATA_ACCESSCONTROLENTRIES);
  dsAccessControlEntriesCopy = ELEMENT_DATA_ACCESSCONTROLENTRIES;
  // dsRateScore = ELEMENT_DATA_RATESCORE;
  // this.dataSource = new MatTableDataSource(users);

  // EXPANSION PANEL DISABLE
  ExpansionPanelAccountDisable: boolean = true;
  ExpansionPanelHomeDisable: boolean = true;
  ExpansionPanelHubDisable: boolean = true;
  ExpansionPanelDeviceDisable: boolean = true;
  ExpansionPanelGuestDisable: boolean = true;
  ExpansionPanelCommunicationDisable: boolean = true;
  ExpansionPanelRateScoreDisable: boolean = true;
  ExpansionPanelAccessControlEntriesDisable: boolean = true;
  // EXPANSION PANEL EXPANDED
  ExpansionPanelAccountExpanded: boolean = false;
  ExpansionPanelHomeExpanded: boolean = false;
  ExpansionPanelHubExpanded: boolean = false;
  ExpansionPanelDeviceExpanded: boolean = false;
  ExpansionPanelGuestExpanded: boolean = false;
  ExpansionPanelCommunicationExpanded: boolean = false;
  ExpansionPanelRateScoreExpanded: boolean = false;
  ExpansionPanelAccessControlEntriesExpanded: boolean = false;

  //EXPANSION PANEL HIDDEN
  ExpansionPanelCommunicationHidden: boolean = false;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  dataArray: string;

  constructor(private _snackBar: MatSnackBar,
    private supportService: SupportServices,
    private clipboard: Clipboard,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {


  }

  ngOnInit(): void {

    if (this.authService.idRol != 1) {
      this.ExpansionPanelCommunicationHidden = true;
    }
    else {
      this.ExpansionPanelCommunicationHidden = false;
    }

    this.DeviceActivitys();

  }

  applyFilter(event: Event, table: string) {
    const filterValue = (event.target as HTMLInputElement).value == null ? null : (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();

    switch (table) {

      case 'Homes':
        this.dsHomes.filter = filterValue;
        if (filterValue == null)
          this.filterHomeInput = filterValue;
        else {
          var filtroHome = this.dsHomes.filteredData[0]["homeName"];

          this.dsHubs.filter = filtroHome;
          this.dsDevices.filter = filtroHome;

          this.filterHubsInput = filtroHome;
          this.filterDevicesInput = filtroHome;

        }
        break;

      case 'Hubs':
        this.dsHubs.filter = filterValue;
        if (filterValue == null)
          this.filterHubsInput = filterValue;
        else {
          var filtroHub = this.dsHubs.filteredData[0]["deviceName"];

          this.dsDevices.filter = filtroHub;
          this.filterDevicesInput = filtroHub;

        }
        break;

      case 'Devices':
        this.dsDevices.filter = filterValue;
        if (filterValue == null)
          this.filterDevicesInput = filterValue;
        break;

      case 'Guests':
        this.dsGuests.filter = filterValue;
        if (filterValue == null)
          this.filterGuestsInput = filterValue;
        break;

      case 'RateScore':
        this.dsRateScore.filter = filterValue;
        if (filterValue == null)
          this.filterRatescoreInput = filterValue;
        break;

      case 'Communication':
        this.dsCommunication.filter = filterValue;
        if (filterValue == null)
          this.filterCommunicationInput = filterValue;
        break;

      case 'AccessEntries':
        this.dsAccessControlEntries.filter = filterValue;
        if (filterValue == null)
          this.filterAccessEntriesInput = filterValue;
        break;
    }


  }


  applyFilterGeneralMac() {

    this.dsHomes.filter = this.filterxHome.trim().toLocaleLowerCase();
    this.filterHomeInput = this.filterxHome;

    this.dsHubs.filter = this.MAC.trim().toLowerCase();
    this.filterHubsInput = this.MAC.trim();

    // this.dsGuests.filter = this.filterxEndpoint.trim().toLowerCase();
    // this.filterGuestsInput = this.filterxEndpoint;

    this.dsDevices.filter = this.filterxHub.trim().toLowerCase();
    this.filterDevicesInput = this.filterxHub;
  }

  copyAll() {
    let ds = [];

    ds.push()

    ds = [this.dsAccountsCopy, this.dsHomesCopy, this.dsHubsCopy, this.dsDevicesCopy, this.dsGuestsCopy, this.dsRateScoreCopy, this.dsAccessControlEntriesCopy, this.dsCommunicationCopy]

    this.dataArray = '';

    ds.forEach((element) => {

      if (element.length > 0) {
        this.dataArray += this.ObjectToArrayHeaders(element[0]);

        element.forEach((row) => {
          // console.log(row)
          // console.log("before: ", dataArray);


          this.dataArray += this.ObjectToArray(row);
          // console.log("after: ", dataArray);
        });

        this.dataArray += '\n\n';
      }

    });


    this.clipboard.copy(this.dataArray);
  }


  async dataLoad(llamada: string, account: any) {



    if (llamada == 'load') {
      this.filterHomeInput = '';
      this.filterHubsInput = '';
      this.filterDevicesInput = '';
      this.filterGuestsInput = '';
      this.filterRatescoreInput = '';
      this.filterCommunicationInput = '';
      this.filterAccessEntriesInput = '';
    }


    if (this.emailFormControl != "" || this.MAC != "") {
      this.progressBar = true;

      if (account) {
        if (llamada == 'guest') {
          this.accountEmail = account.email;
          this.emailFormControl = this.accountEmail;
        }
        else {
          this.accountID = parseInt(account.accountID);
          this.accountEmail = account.email;
          this.emailFormControl = this.accountEmail;
        }
      }
      else {
        this.accountID = 0;
      }

      await this.supportService.getDataObjects(this.emailFormControl, this.MAC, this.accountID).subscribe((res: SupportType) => {

        if (res.accounts) {
          if (res.accounts.length == 1) {
            this.searchAccount = false;
            this.dsAccounts = new MatTableDataSource<Account>(res.accounts);
            this.dsHomes = new MatTableDataSource<Home>(res.homes);
            this.dsHubs = new MatTableDataSource<Hubs>(res.hubs);
            this.dsDevices = new MatTableDataSource<Devices>(res.devices);
            this.dsGuests = new MatTableDataSource<Guest>(res.guests);
            this.dsCommunication = new MatTableDataSource<Communication>(res.communications);
            this.dsRateScore = new MatTableDataSource<RateAppScore>(res.rateAppScore);
            this.dsAccessControlEntries = new MatTableDataSource<AccessControlEntries>(res.accessControlEntries);

            if (this.dsAccounts.data.length != 0)
              this.ExpansionPanelAccountDisable = false;
            if (this.dsHomes.data.length != 0)
              this.ExpansionPanelHomeDisable = false;
            if (this.dsHubs.data.length != 0)
              this.ExpansionPanelHubDisable = false;
            if (this.dsDevices.data.length != 0)
              this.ExpansionPanelDeviceDisable = false;
            if (this.dsGuests.data.length != 0)
              this.ExpansionPanelGuestDisable = false;
            if (this.dsCommunication != null)
              this.ExpansionPanelCommunicationDisable = false;
            if (this.dsRateScore.data.length != 0)
              this.ExpansionPanelRateScoreDisable = false;
            if (this.dsAccessControlEntries.data.length != 0)
              this.ExpansionPanelAccessControlEntriesDisable = false;

            this.ExpansionPanelAccountExpanded = false;

            if (this.dsHubs.data.length != 0)
              this.ExpansionPanelHubExpanded = true;
            else
              this.ExpansionPanelHubExpanded = false;
            if (this.dsDevices.data.length != 0)
              this.ExpansionPanelDeviceExpanded = true;
            else
              this.ExpansionPanelDeviceExpanded = false;
            // DS COPYS
            this.dsAccountsCopy = res.accounts;
            this.dsHomesCopy = res.homes;
            this.dsHubsCopy = res.hubs;
            this.dsDevicesCopy = res.devices;
            this.dsGuestsCopy = res.guests;
            this.dsCommunicationCopy = res.communications;
            this.dsRateScoreCopy = res.rateAppScore;
            this.dsAccessControlEntriesCopy = res.accessControlEntries;

            this.dsAccessControlEntries = new MatTableDataSource<AccessControlEntries>(res.accessControlEntries);

            this.dsAccessControlEntries.paginator = this.paginator;

            //Filtrar
            if (this.MAC != "") {
              this.hubsFilter = res.hubs.filter(w => w.mac == this.MAC);

              this.filterxHome = this.hubsFilter[0].homeName;
              this.filterxHub = this.hubsFilter[0].deviceName;
              this.filterxEndpoint = this.hubsFilter[0].deviceName;

              this.applyFilterGeneralMac();
            }

            this.progressBar = false;

            console.log(this.dsAccounts, 'elment data account')
          }
          else if (res.accounts.length > 0) {

            this.searchAccount = true;
            res.accounts.forEach(element => {

              this.listEmails.push(element.email.toString());
            });

            // this.openDialog();
            this.dsAccounts = null;
            this.dsHomes = null;
            this.dsHubs = null;
            this.dsDevices = null;
            this.dsGuests = null;
            this.dsCommunication = null;
            this.dsRateScore = null;
            this.dsAccessControlEntries = null;

            this.dsAccounts = new MatTableDataSource<Account>(res.accounts);

            this.dsAccountsCopy = res.accounts;

            this.ExpansionPanelAccountDisable = false;
            this.ExpansionPanelHomeDisable = true;
            this.ExpansionPanelHubDisable = true;
            this.ExpansionPanelDeviceDisable = true;
            this.ExpansionPanelGuestDisable = true;
            this.ExpansionPanelCommunicationDisable = true;
            this.ExpansionPanelRateScoreDisable = true;
            this.ExpansionPanelAccessControlEntriesDisable = true;

            this.ExpansionPanelAccountExpanded = true;
            this.ExpansionPanelHomeExpanded = false;
            this.ExpansionPanelHubExpanded = false;
            this.ExpansionPanelDeviceExpanded = false;
            this.ExpansionPanelGuestExpanded = false;
            this.ExpansionPanelCommunicationExpanded = false;
            this.ExpansionPanelRateScoreExpanded = false;
            this.ExpansionPanelAccessControlEntriesExpanded = false;

            this.progressBar = false;

          }
        }
        else {
          this.searchAccount = false;
          this.dsAccounts = null;
          this.dsHomes = null;
          this.dsHubs = null;
          this.dsDevices = null;
          this.dsGuests = null;
          this.dsCommunication = null;
          this.dsRateScore = null;
          this.dsAccessControlEntries = null;

          this.ExpansionPanelAccountDisable = true;
          this.ExpansionPanelHomeDisable = true;
          this.ExpansionPanelHubDisable = true;
          this.ExpansionPanelDeviceDisable = true;
          this.ExpansionPanelGuestDisable = true;
          this.ExpansionPanelCommunicationDisable = true;
          this.ExpansionPanelRateScoreDisable = true;
          this.ExpansionPanelAccessControlEntriesDisable = true;

          this.ExpansionPanelAccountExpanded = false;
          this.ExpansionPanelHomeExpanded = false;
          this.ExpansionPanelHubExpanded = false;
          this.ExpansionPanelDeviceExpanded = false;
          this.ExpansionPanelGuestExpanded = false;
          this.ExpansionPanelCommunicationExpanded = false;
          this.ExpansionPanelRateScoreExpanded = false;
          this.ExpansionPanelAccessControlEntriesExpanded = false;

          this.progressBar = false;

          //this.listStatus = ListStatus.Error;
          this._snackBar.open("No se han encontrado datos.", "OK", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar'],
          });
        }

      },
        (err) => {

          this.searchAccount = false;
          this.dsAccounts = null;
          this.dsHomes = null;
          this.dsHubs = null;
          this.dsDevices = null;
          this.dsGuests = null;
          this.dsCommunication = null;
          this.dsRateScore = null;
          this.dsAccessControlEntries = null;

          this.ExpansionPanelAccountDisable = true;
          this.ExpansionPanelHomeDisable = true;
          this.ExpansionPanelHubDisable = true;
          this.ExpansionPanelDeviceDisable = true;
          this.ExpansionPanelGuestDisable = true;
          this.ExpansionPanelCommunicationDisable = true;
          this.ExpansionPanelRateScoreDisable = true;
          this.ExpansionPanelAccessControlEntriesDisable = true;

          this.ExpansionPanelAccountExpanded = false;
          this.ExpansionPanelHomeExpanded = false;
          this.ExpansionPanelHubExpanded = false;
          this.ExpansionPanelDeviceExpanded = false;
          this.ExpansionPanelGuestExpanded = false;
          this.ExpansionPanelCommunicationExpanded = false;
          this.ExpansionPanelRateScoreExpanded = false;
          this.ExpansionPanelAccessControlEntriesExpanded = false;

          this.progressBar = false;

          //this.listStatus = ListStatus.Error;
          this._snackBar.open("No se han encontrado datos.", "OK", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar'],
          });
        }

        // console.log(x,'info')

      );


    }
    else {

      this.searchAccount = false;
      this.dsAccounts = null;
      this.dsHomes = null;
      this.dsHubs = null;
      this.dsDevices = null;
      this.dsGuests = null;
      this.dsCommunication = null;
      this.dsRateScore = null;
      this.dsAccessControlEntries = null;

      this.ExpansionPanelAccountDisable = true;
      this.ExpansionPanelHomeDisable = true;
      this.ExpansionPanelHubDisable = true;
      this.ExpansionPanelDeviceDisable = true;
      this.ExpansionPanelGuestDisable = true;
      this.ExpansionPanelCommunicationDisable = true;
      this.ExpansionPanelRateScoreDisable = true;
      this.ExpansionPanelAccessControlEntriesDisable = true;

      this.ExpansionPanelAccountExpanded = false;
      this.ExpansionPanelHomeExpanded = false;
      this.ExpansionPanelHubExpanded = false;
      this.ExpansionPanelDeviceExpanded = false;
      this.ExpansionPanelGuestExpanded = false;
      this.ExpansionPanelCommunicationExpanded = false;
      this.ExpansionPanelRateScoreExpanded = false;
      this.ExpansionPanelAccessControlEntriesExpanded = false;
      this.progressBar = false;

      this._snackBar.open("Favor de ingresar Email o MAC ADDRESS.", "OK", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar'],
      });
    }

    console.log(this.MAC, 'MAC');
    console.log(this.emailFormControl, 'Email');

  }

  // async dataReLoad() {


  //   if (this.emailFormControl != "" || this.MAC != null) {

  //     await this.supportService.getDataObjects(this.emailFormControl, this.MAC).subscribe((res: SupportType) => {
  //       // (res) => {
  //       //this.listStatus = ListStatus.Ready;

  //       //this.getPreviews();
  //       // this.dataSource = res.account[0];
  //       // this.supportType2.account = res.account;
  //       // this.supportType2.homes = res.homes;
  //       // this.supportType2.hubs = res.hubs;
  //       // this.supportType2.devices = res.devices;
  //       // this.supportType2.comunications = res.comunications;

  //       this.dsAccounts = new MatTableDataSource<Account>(res.accounts);

  //       ELEMENT_DATA_HOMES.pop();
  //       // ELEMENT_DATA_HOMES.push(res.homes);
  //       this.dsHomes = new MatTableDataSource<Home>(res.homes);
  //       this.dsHubs = new MatTableDataSource<Hubs>(res.hubs);
  //       this.dsDevices = new MatTableDataSource<Devices>(res.devices);
  //       this.dsCommunication = new MatTableDataSource<Communication>(res.communications);

  //       console.log(this.dsAccounts, 'elment data account')

  //       // return this.dsAccounts = ELEMENT_DATA_ACCOUNTS;

  //     },
  //       (err) => {
  //         //this.listStatus = ListStatus.Error;
  //         this._snackBar.open("No se han encontrado datos.", "OK", {
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition,
  //           duration: 3000,
  //           panelClass: ['red-snackbar'],
  //         });
  //       }

  //       // console.log(x,'info')

  //     );


  //   }
  //   else {
  //     this._snackBar.open("Favor de ingresar Email o MAC ADDRESS.", "OK", {
  //       horizontalPosition: this.horizontalPosition,
  //       verticalPosition: this.verticalPosition,
  //       duration: 3000,
  //       panelClass: ['red-snackbar'],
  //     });
  //   }

  //   console.log(this.MAC, 'MAC');
  //   console.log(this.emailFormControl, 'Email');
  // }

  copyData(table: string) {
    let ds = [];

    switch (table) {

      case 'Account':
        ds = this.dsAccountsCopy;
        break;

      case 'Homes':
        ds = this.dsHomesCopy;
        break;

      case 'Hubs':
        ds = this.dsHubsCopy;

        break;
      case 'Devices':
        ds = this.dsDevicesCopy
        break;

      case 'Guests':
        ds = this.dsGuestsCopy;
        break;

      case 'RateScore':
        ds = this.dsRateScoreCopy;
        break;

      case 'AccessControlEntries':
        ds = this.dsAccessControlEntriesCopy;
        break;

      case 'Communication':
        ds = this.dsCommunicationCopy;
        break;
    }

    this.dataArray = '';

    this.dataArray += this.ObjectToArrayHeaders(ds[0]);

    ds.forEach((row) => {

      this.dataArray += this.ObjectToArray(row);
    });

    this.clipboard.copy(this.dataArray);
    // return this.dataArray;
  }

  ObjectToArrayHeaders(obj: object): string {
    let result = Object.keys(obj).map((key: keyof typeof obj) => {
      let Headers = key;
      return Headers;
    });
    return result.toString().toUpperCase().replace(/,/g, '\t') + '\n';
  }

  ObjectToArray(obj: object): string {
    let result = Object.keys(obj).map((key: keyof typeof obj) => {
      let Headers = key;
      let value = obj[key];
      return value;
    });
    return result.toString().replace(/,/g, '\t') + '\n';
  }
  async DeviceActivitys() {
    await this.supportService.getDevicesActivity().subscribe((res: DevicesActivity) => {
      this.Last24Hs = res.last24Hs;
      this.Online = res.online;
      this.OfflineLast5Mins = res.offlineLast5Mins;
      this.OfflineMoreThan5Mins = res.offlineMoreThan5Mins;
    });
  }

  async resend(accountID: number) {
    this.supportService.resendEmail(accountID).subscribe((res: any) => {
      console.log(res);
    });
  }

  async logout() {
    await this.authService.logout();

    await this.router.navigate(['/login'], { replaceUrl: true });
  }

}