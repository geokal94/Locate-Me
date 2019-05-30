import { Component, OnInit,NgZone } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-first-screen',
  templateUrl: './first-screen.page.html',
  styleUrls: ['./first-screen.page.scss'],
})
export class FirstScreenPage implements OnInit {

  user: any;
	userReady: boolean = false;

	autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  nearbyItems: any = new Array<any>();
  loading: any;

  constructor(
    private fb: Facebook,
		private nativeStorage: NativeStorage,
		public loadingController: LoadingController,
		private router: Router,
		public zone: NgZone,
    public loadingCtrl: LoadingController
  ) {

		this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.loading = this.loadingCtrl.create();

	 }

  async ngOnInit(){
		const loading = await this.loadingController.create({
			message: 'Please wait...'
		});
		await loading.present();
		this.nativeStorage.getItem('facebook_user')
		.then(data =>{
			this.user = {
				name: data.name,
				email: data.email,
				picture: data.picture
			};
				loading.dismiss();
				this.userReady = true;
		}, error =>{
			console.log(error);
			loading.dismiss();
		});
	}

	doFbLogout(){
		this.fb.logout()
		.then(res =>{
			this.router.navigate(["/home"]);
			//user logged out so we will remove him from the NativeStorage
			this.nativeStorage.remove('facebook_user');
		}, error =>{
			this.router.navigate(["/home"]);
			console.log(error);
		});
	}

	updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }

  selectSearchResult(item){
    this.loading.present();
    this.autocompleteItems = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        this.autocompleteItems = [];
        this.GooglePlaces.nearbySearch({
          location: results[0].geometry.location,
          radius: '500',
          
          // key: 'YOUR_KEY_HERE'
        }, (near_places) => {
          this.zone.run(() => {
            this.nearbyItems = [];
            for (var i = 0; i < near_places.length; i++) {
              this.nearbyItems.push(near_places[i]);
            }
            this.loading.dismiss();
          });
        })
      }
    })
  }



	
}
