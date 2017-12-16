import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const url = 'https://ubk2kssfj5.execute-api.us-east-1.amazonaws.com/Dev/reservations';

export interface Reservation {
  propertyName: string
}

export interface GetReservationsResponse {
  Items: Reservation[]
}

@Injectable()
export class HopApiService {

  constructor(private httpClient: HttpClient) { }

  getReservations() {
    const headers = new HttpHeaders().set('x-api-key', 'Ai7RemrPPk96XGDz8pdHw1ZUeJZgDXGW18iispp9');
    return this.httpClient.get<GetReservationsResponse>(url, {headers: headers })
  }
  //
  // getRandomQuote(context: RandomQuoteContext): Observable<string> {
  //   return this.http.get(routes.quote(context), { cache: true })
  //     .pipe(
  //       map((res: Response) => res.json()),
  //       map(body => body.value),
  //       catchError(() => of('Error, could not load joke :-('))
  //     );
  // }

}
