import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {GetReservationResponse, HopApiService, Reservation, Response} from '../home/hop-api.service';
import {finalize} from 'rxjs/operators';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ActivatedRoute, Router} from '@angular/router';

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
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private navController: NavController,
              private route: ActivatedRoute,
              private router: Router) { }

  response: Response;
  version: string = environment.version;
  title = 'Edit Reservation';
  reservation: Reservation = {
    'apartment': false,
    'carrier': null,
    'checkInDate': null,
    'checkOutDate': null,
    // This should be done in the property table since we may want a different default for each property.
    'checkOutTime': '11:00',
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
    'reservationSource': null,
    'isFriend': false
  };

  ngOnInit() {
    const loading = this.loadingCtrl.create();
    loading.present();
    const checkInDate = this.route.snapshot.firstChild.firstChild.paramMap.get('checkInDate');
    const propertyName = this.route.snapshot.firstChild.firstChild.paramMap.get('propertyName');
    if (this.hopApiService.reservations == null) {
      // Load the reservation being edited
      if (propertyName != null && checkInDate != null) {
        this.hopApiService.getReservation(propertyName, checkInDate).subscribe((response: GetReservationResponse) => {
          this.reservation = response.Item;
        });
      }
    } else {
      const res = this.findReservationInList(checkInDate, propertyName);
      this.reservation = res;
    }
    // Check if we are editing an existing reservation
    if (this.propertyName != null) {
      this.title = 'Editing Reservation';
    } else {
      loading.dismiss();
      this.title = 'Adding New Reservation';
    }
  }

  /**
   * Get full reservation details by loading reservation from application store
   * @param checkInDate of reservation
   * @param propertyName of reservation
   */
  findReservationInList(checkInDate: string, propertyName: string) {
    for (let i = 0; i < this.hopApiService.reservations.length; i++) {
      const res = this.hopApiService.reservations[i];
      if (res.checkInDate === checkInDate && res.propertyName === propertyName) {
        return res;      
      }
    }
    return this.reservation;
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
        // Pop edit/add page to go back to home
        this.router.navigate(['/home']);
        // this.navController.pop().then(() => this.navController.setRoot(this.navController.getActive().component));
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

