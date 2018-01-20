import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {GetReservationResponse, HopApiService, Reservation, Response} from '../home/hop-api.service';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {


  isLoading: boolean;
  propertyName: string;
  checkInDate: string;

  constructor(private hopApiService: HopApiService,
              private router: Router,
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private navController: NavController) { }

  response: Response;
  version: string = environment.version;
  title = 'Edit Reservation';
  reservation: Reservation = {
    'apartment': false,
    'carrier': null,
    'checkInDate': null,
    'checkOutDate': null,
    'ddReturned': null,
    'email': null,
    'firstName': null,
    'flightArrivalTime': null,
    'flightNum': null,
    'flightOrigCity': null,
    'guestsNum': null,
    'instructionsSent': null,
    'lastName': null,
    'meetTime': null,
    'notes': null,
    'phoneNum': null,
    'propertyName': null,
    'reservationSource': null
  };

  ngOnInit() {
    const loading = this.loadingCtrl.create();
    loading.present();
    this.propertyName = this.navParams.get('propertyName');
    // Check if we are editing an existing reservation
    if (this.propertyName != null) {
      this.checkInDate = this.navParams.get('checkInDate');
      this.title = 'Editing Reservation';
      this.hopApiService.getReservationById(this.propertyName, this.checkInDate)
        .pipe(finalize( () => {
          this.isLoading = false;
          loading.dismiss();
        }))
        .subscribe((getReservationResponse: GetReservationResponse) => {
            this.reservation = getReservationResponse.Item;
          },
          error => {
            console.log(error);
          });
    } else {
      loading.dismiss();
      this.title = 'Adding New Reservation';
      console.log('Adding new reservation.');
    }
  }

  addReservation() {
    const loading = this.loadingCtrl.create();
    loading.present();
    this.isLoading = true;
    this.hopApiService.addReservation(this.reservation)
      .pipe(finalize(() => {
        this.isLoading = false;
        loading.dismiss();
      }))
      .subscribe((response: Response) => {
        this.response = response;
        const alert = this.alertCtrl.create({
          title: 'Update Successful',
          subTitle: 'Successfully updated reservation for ' + this.propertyName + ' on ' + this.checkInDate,
          buttons: ['OK']
        });
        alert.present();
        this.navController.pop(AddReservationComponent);
      }, error => {
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Something went wrong updating your reservation for ' + this.propertyName + ' on '
          + this.checkInDate,
          buttons: ['OK']
        });
        alert.present();
          console.log(error);
        });
  }

}

