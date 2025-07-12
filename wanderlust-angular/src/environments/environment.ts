// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  loginUri :  "http://localhost:4000/wanderlust/userAPI/userLogin",
  getPackages : "http://localhost:4000/wanderlust/packageAPI/getPackages",
  book : "http://localhost:4000/wanderlust/bookingAPI/bookings",
  deleteUrl : "http://localhost:4000/wanderlust/bookingAPI/bookings",
  getBookings : "http://localhost:4000/wanderlust/bookingAPI/",
  cancelBooking : "http://localhost:4000/wanderlust/bookingAPI/",
  getDestinationById : "http://localhost:4000/wanderlust/packageAPI/itinerary",
  registerUser : "http://localhost:4000/wanderlust/userAPI/userRegister",
  forgotPassword: "http://localhost:4000/wanderlust/userAPI/userForgotPassword",
  getUserProfile: "http://localhost:4000/wanderlust/userAPI/userProfile", // CHANGE THIS
  updateUserProfile: "http://localhost:4000/wanderlust/userAPI/updateProfile",
  changePassword: "http://localhost:4000/wanderlust/userAPI/changePassword",
  production: false
};


//added a comment



//my comment

//added a comment
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
