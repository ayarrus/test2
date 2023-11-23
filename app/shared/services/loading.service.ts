import { Injectable } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
// import { StatusBar, Style } from '@capacitor/status-bar';
import { Router } from '@angular/router';
@Injectable({
	providedIn: 'root'
})
export class LoadingService {
	fullScreenLoading: HTMLIonModalElement;
	popupLoading: HTMLIonLoadingElement;
	isLoading: boolean = false;
	fullscreenLiteral: any;
	constructor(
		private loadingController: LoadingController,
		private platform: Platform,
		private router: Router
	) { }

	show(message?: string) {
		return new Promise<void>(async (resolve, reject) => {
			if (!this.isLoading) {
				this.isLoading = true;
				console.log('load');
				/* this.fullscreenloading = await this.modalCtrl.create({component: FullscreenloadingComponent, componentProps: {text: message}});
		this.fullscreenloading.present();
		*/
				this.popupLoading = await this.loadingController.create({
					message,
					mode: 'ios',
					spinner: 'circles'
				});
				console.log('start present');

				await this.popupLoading
					.present()
					.then(async () => {
						console.log('present');
						resolve();
					})
					.catch(() => {
						console.log('present catch');
						resolve();
					});
			}

			resolve();
		});
	}
	async dismiss() {
		console.log('loading: ' + this.isLoading);

		if (this.isLoading) {
			console.log('dismiss');
			// this.fullScreenLoading.dismiss();
			if (this.popupLoading) {
				await this.popupLoading.dismiss();
			}
			this.isLoading = false;
		} else {
			try {
				if(!window.sessionStorage.getItem('stoken')){

					this.router.navigate(['/login'], { replaceUrl: true })
				}

				if (this.popupLoading) {
					await this.popupLoading.dismiss();
				}
			} catch (err) {
				console.log('error popup');
				console.log(err);
			}
		}
	}

	setFullscreenLiteral(text: string) {
		this.fullscreenLiteral = text;
	}
	getFullscreenLiteral() {
		return this.fullscreenLiteral;
	}
}
