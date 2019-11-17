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
import {Router} from '@angular/router';

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
              private authService: AuthenticationService,
              private router: Router) { }

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
      // Update reservations in shared service
      this.reservations = response.Items;
      this.hopApiService.reservations = this.reservations;
    }, err => {
      console.log('Could not retrieve reservations, loading from local storage', err);
      // Apply permissions filter to only include reservations user is permitted to view
      this.reservations = JSON.parse(localStorage.getItem(upcomingReservationsKey)).Items;
      // Update reservations in shared service
      this.hopApiService.reservations = this.reservations;
    });
  }
  ngOnChanges() {
    this.ngOnInit();
  }
  // Add a new reservation
  add() {
    this.router.navigate(['/reservation/add']);
  }

  // Edit an existing reservation
  edit(reservation: Reservation) {
    this.navCtrl
      .push(AddReservationComponent, {propertyName: reservation.propertyName, checkInDate: reservation.checkInDate});
  }

  delete(reservation: Reservation) {
    const confirmDeletionAlert = this.alertCtrl.create({
      title: 'Confirm Deletion',
      message: 'Delete reservation for ' + reservation.lastName + ' on ' + reservation.checkInDate + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Deletion cancelled.');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.isLoading = true;
            this.hopApiService.deleteReservation(reservation.propertyName, reservation.checkInDate)
              .pipe(finalize(() => {
                this.isLoading = false;
              }))
              .subscribe((response: Response) => {
                const alert = this.alertCtrl.create({
                  title: 'Deletion Successful',
                  subTitle: 'Successfully deleted reservation for '
                    + reservation.lastName + ' on ' + reservation.checkInDate,
                  buttons: ['OK']
                });
                alert.present();
                this.reservations = this.reservations.filter(function (element: Reservation) {
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
        }
      ]
    });
    confirmDeletionAlert.present();
  }

  initializePropertyNames() {
    this.propertyNames = [
      'Palm Beach',
      'Aruban Jewel',
      'Blue Breeze',
      'Casa Tranquila',
      'Confederate',
      'Turnberry',
      'Sol to Soul',
      'Palm Beach 462'
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
}
