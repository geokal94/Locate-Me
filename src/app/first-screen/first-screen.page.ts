import { Component, OnInit } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-first-screen',
  templateUrl: './first-screen.page.html',
  styleUrls: ['./first-screen.page.scss'],
})
export class FirstScreenPage implements OnInit {

  user: any;
	userReady: boolean = false;

  constructor(
    private fb: Facebook,
		private nativeStorage: NativeStorage,
		public loadingController: LoadingController,
		private router: Router
  ) { }

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
			//user logged out so we will remove him from the NativeStorage
			this.nativeStorage.remove('facebook_user');
			this.router.navigate(["/home"]);
		}, error =>{
			console.log(error);
		});
	}
}
