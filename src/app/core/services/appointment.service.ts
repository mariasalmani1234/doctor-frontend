import { Injectable } from '@angular/core';

import {
  Appointment
} from '../../models/appointment.model';



@Injectable({

providedIn:'root'

})
export class AppointmentService {



private appointments:Appointment[]=[];




getAll(){

return this.appointments;

}





create(data:Appointment){


this.appointments.unshift(data);


return this.appointments;


}





delete(id:number){


this.appointments =
this.appointments.filter(

item=>item.id!==id

);


}




}