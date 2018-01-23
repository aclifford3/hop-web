import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import {GetReservationsResponse, HopApiService, Reservation, Response} from './hop-api.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {AddReservationComponent} from '../add-reservation/add-reservation.component';
import {AuthenticationService} from '../core/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean;
  shouldHide: boolean;
  propertyNames: String[];
  groupPermissions = {
    admin: ['All'],
    PalmBeach: ['Palm Beach'],
    Dushi: ['Dushi Tortuga', 'Dushi Iguana'],
    ArubaClifford: ['Aruban Jewel', 'Blue Breeze', 'Casa Tranquila'],
    US: ['Turnberry', 'Confederate']
  };

  // ngOnInit() {
  //   this.isLoading = true;
  //   this.quoteService.getRandomQuote({ category: 'dev' })
  //     .pipe(finalize(() => { this.isLoading = false; }))
  //     .subscribe((quote: string) => { this.quote = quote; });
  // }

  constructor(private hopApiService: HopApiService,
              private router: Router,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private authService: AuthenticationService) { }

  reservations: Reservation[];
   propertyNameFilter: string;
  version: string = environment.version;

  ngOnInit() {
    const loading = this.loadingCtrl.create();
    loading.present();
    this.shouldHide = true;
    this.isLoading = true;
    this.hopApiService.getReservations()
      .pipe(finalize(() => { this.isLoading = false;
        loading.dismiss();
      }))
      .subscribe((reservations: GetReservationsResponse) => {
        // Apply permissions filter to only include reservations user is permitted to view
        const permittedPropertyNames = this.getPermittedPropertyNames();
        // Store all reservations initially
        this.reservations = reservations.Items;
        // If not admin, filter
        if (!(permittedPropertyNames.indexOf('All') > -1)) {
          console.log('User is not an admin.');
          this.reservations = this.reservations.filter(function (reservation: Reservation) {
            return permittedPropertyNames.indexOf(reservation.propertyName) > -1;
          });
        }
      });
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
      'Turnberry'
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
    const groupPermissions = this.groupPermissions;
    Object.keys(groupPermissions).forEach(function(key: string) {
      // If user has a group, give access to those properties
      if (groups.indexOf(key) > -1) {
        permittedPropertyNames = permittedPropertyNames.concat(groupPermissions[key]);
      }
    });
    return permittedPropertyNames;
  }
}
