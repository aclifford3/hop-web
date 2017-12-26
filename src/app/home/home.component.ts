import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import {GetReservationsResponse, HopApiService, Reservation, Response} from './hop-api.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {AlertController, NavController} from 'ionic-angular';
import {AddReservationComponent} from '../add-reservation/add-reservation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean;
  shouldHide: boolean;

  // ngOnInit() {
  //   this.isLoading = true;
  //   this.quoteService.getRandomQuote({ category: 'dev' })
  //     .pipe(finalize(() => { this.isLoading = false; }))
  //     .subscribe((quote: string) => { this.quote = quote; });
  // }

  constructor(private hopApiService: HopApiService,
              private router: Router,
              private navCtrl: NavController,
              private alertCtrl: AlertController) { }

  reservations: Reservation[];
  propertyNameFilter: string;
  version: string = environment.version;

  ngOnInit() {
    this.shouldHide = true;
    this.isLoading = true;
    this.hopApiService.getReservations()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((reservations: GetReservationsResponse) => {
        this.reservations = reservations.Items;
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
}
