class Itinerary{
    itineraryId:string="";
    firstDay:string="";
    restOfDays:String="";
    lastDay:string="";
}
class Details{
    detailsId:String="";
    packageInclusion:String="";
    highlights:String="";
    pace:String="";
    about:String="";
    itinerary:Itinerary = new Itinerary();
}
export class Destination{
    destinationId:any="";
    continent:string="";
    destinationName:string="";
    imageUrl:string="";
    details:Details = new Details();
    noOfNights:number=0;
    chargePerPerson:number=0;
    discount:number=0;
    availability:number=0;
    flightCharge:number=0;
    
} 