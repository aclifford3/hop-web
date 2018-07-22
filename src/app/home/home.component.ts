import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { finalize } from 'rxjs/operators';

import {
  GetReservationsResponse, HopApiService, Reservation, Response,
  upcomingReservationsKey
} from './hop-api.service';
import {environment} from '../../environments/environment';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {AddReservationComponent} from '../add-reservation/add-reservation.component';
import {AuthenticationService} from '../core/authentication/authentication.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {

  @Input() daysOfHistory: string;
  @Input() title = 'Upcoming';
  reservations: Reservation[];
  isLoading: boolean;
  shouldHide: boolean;
  propertyNames: String[];
  groupPermissionMappings = {
    admin: ['All'],
    PalmBeach: ['Palm Beach'],
    Dushi: ['Dushi Tortuga', 'Dushi Iguana'],
    ArubaClifford: ['Aruban Jewel', 'Blue Breeze', 'Casa Tranquila', 'Palm Beach', 'Sol to Soul'],
    US: ['Turnberry', 'Confederate']
  };

  // ngOnInit() {
  //   this.isLoading = true;
  //   this.quoteService.getRandomQuote({ category: 'dev' })
  //     .pipe(finalize(() => { this.isLoading = false; }))
  //     .subscribe((quote: string) => { this.quote = quote; });
  // }

  constructor(private hopApiService: HopApiService,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private authService: AuthenticationService) { }

  propertyNameFilter: string;
  version: string = environment.version;

  ngOnInit() {
    const loading = this.loadingCtrl.create();
    loading.present();
    this.shouldHide = true;
    this.isLoading = true;

    let getReservations: Observable<GetReservationsResponse>;
    if (this.daysOfHistory == null) {
      getReservations = this.hopApiService.getReservations();
    } else {
      console.log('Getting history');
      getReservations = this.hopApiService.getReservationsSince(this.daysOfHistory);
    }
    getReservations.pipe(finalize(() => { this.isLoading = false;
      loading.dismiss();
    }))
    .subscribe((response: GetReservationsResponse) => {
      console.log('Reservations raw: ', response);
      // Apply permissions filter to only include reservations user is permitted to view
      this.filterUnauthorizedReservations(response);
      // Update reservations in shared service
      this.hopApiService.reservations = this.reservations;
    }, err => {
      console.log('Could not retrieve reservations, loading from local storage', err);
      // Apply permissions filter to only include reservations user is permitted to view
      this.filterUnauthorizedReservations(JSON.parse(localStorage.getItem(upcomingReservationsKey)));
      // Update reservations in shared service
      this.hopApiService.reservations = this.reservations;
    });
  }
  ngOnChanges() {
    this.ngOnInit();
  }

  /**
   * Filter out reservations the user is not permitted to see
   * @param {GetReservationsResponse} reservations
   */
  private filterUnauthorizedReservations(response: GetReservationsResponse) {
    const permittedPropertyNames = this.getPermittedPropertyNames();
    // Store all reservations initially
    this.reservations = response.Items;
    // If not admin, filter
    if (!(permittedPropertyNames.indexOf('All') > -1)) {
      this.reservations = response.Items.filter(function (reservation: Reservation) {
        return permittedPropertyNames.indexOf(reservation.propertyName) > -1;
      });
    }
    console.log('Reservations: ', this.reservations);
  }
  // Add a new reservation
  add() {
    this.navCtrl.push(AddReservationComponent);
  }

  // Edit an existing reservation
  edit(reservation: Reservation) {
    this.navCtrl
      .push(AddReservationComponent, {propertyName: reservation.propertyName, checkInDate: reservation.checkInDate});
  }

  delete(reservation: Reservation) {
    this.isLoading = true;
    this.hopApiService.deleteReservation(reservation.propertyName, reservation.checkInDate)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response: Response) => {
        const alert = this.alertCtrl.create({
          title: 'Delete Successful',
          subTitle: 'Successfully deleted reservation for '
          + reservation.propertyName + ' on ' + reservation.checkInDate,
          buttons: ['OK']
        });
        alert.present();
        this.reservations = this.reservations.filter(function(element: Reservation) {
          return !(element.checkInDate === reservation.checkInDate &&
            element.propertyName === reservation.propertyName);
        });
      }, error => {
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Something went wrong deleting your reservation for ' + reservation.propertyName + ' on '
          + reservation.checkInDate,
          buttons: ['OK']
        });
        alert.present();
        console.log(error);
      });
  }

  initializePropertyNames() {
    this.propertyNames = [
      'Palm Beach',
      'Aruban Jewel',
      'Blue Breeze',
      'Casa Tranquila',
      'Confederate',
      'Dushi Iguana',
      'Dushi Tortuga',
      'Turnberry',
      'Sol to Soul'
    ];
  }

  getPropertyNames(ev: any) {
    // Reset items back to all of the items
    this.initializePropertyNames();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // // if the value is an empty string don't filter the items
    // if (val && val.trim() !== '') {
    //   console.log('Value is ' + val);
    //   this.propertyNames = this.propertyNames.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   });
    // }
    this.propertyNameFilter = val;
  }

  /**
   * Get list of property names user can access
   */
  getPermittedPropertyNames(): string[] {
    let permittedPropertyNames: string[] = [];
    const groups = this.authService.getUserGroups();
    console.log('Groups: ', groups);
    const groupPermissionMappings = this.groupPermissionMappings;
    console.log('Group permission mapping: ', this.groupPermissionMappings);
    Object.keys(groupPermissionMappings).forEach(function(key: string) {
      // If user has a group, give access to those properties
      if (groups.indexOf(key) > -1) {
        permittedPropertyNames = permittedPropertyNames.concat(groupPermissionMappings[key]);
      }
    });
    return permittedPropertyNames;
  }
}
