import { Users } from './User';
import { Destination } from './Package';

export class Booking{
    bookingId:string="";
    user!: Users;
    destination!: Destination;
    checkIn: string="";
    checkOut: string="";
    noOfPeople:number=0;
    totalCost:number=0;
    timeStamp:string="";
    message:string="";
    flight:Boolean=false;
} 