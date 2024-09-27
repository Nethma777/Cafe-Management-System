import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialogConfig } from '@angular/material/dialog';
import { CategoryComponent } from 'src/app/material-component/dialog/category/category.component';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'edit'];
  dataSource:any;
  responseMessage:any;
  

  constructor(private dialog:MatDialog,
    private categoryService:CategoryService,
    private snackbarService:SnackbarService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.tableData();
  }


  tableData(){
    this.categoryService.getCategory().subscribe((response:any) => {
   this.dataSource = new MatTableDataSource(response);
  },(error:any) => {
    if(error.error?.message){ 
      this.responseMessage = error.error?.message;
  }else{
    this.responseMessage=GlobalConstants.genericError;
  }
this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);

})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'Add'
    }
    dialogConfig.width = '550px';
    const dialogRef = this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddCategory.subscribe(
      (response:any) => {
        this.tableData();
      }
    );
  }

  
  handleEditElement(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'Edit',
      data:values
    }
    dialogConfig.width = '550px';
    const dialogRef = this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditCategory.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }
  }

