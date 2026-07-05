import { Restaurant } from './Restaurant';
import { Schedule } from './Schedule';

export class Reservation {
  reservationId: number = 0;
  idUsuario: number = 0;
  restaurantid: number = 0;
  scheduleId: number = 0;
  tableId: number = 0;
  reservationDate: string = '';
  status: string = '';
  numberPeople: number = 0;

  // Propiedades opcionales devueltas por el listado (ReservationListDTO)
  restaurant?: Restaurant;
  restaurantTable?: any;
  schedule?: Schedule;
}