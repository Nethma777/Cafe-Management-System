import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	responseMessage: any;
	data: any;

	ngAfterViewInit() { }

	constructor(private dashboardService: DashboardService,
		private snackbarService: SnackbarService,
	) {
		this.dashboardData();
	}

	dashboardData() {
		this.dashboardService.getDeatails().subscribe((response:any) => {
			this.data = response;
			console.log(this.responseMessage);
			
		},
			(error:any) => {
				if(error.error.message){
					this.data = error.error?.message;
				}else{
					this.data = GlobalConstants.genericError;
				}
				this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
			});
	}
}
