import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { BillService } from 'src/app/services/bill.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total', 'edit'];  
  dataSource:any=[];
  manageOrderForm:any=FormGroup;
  categorys:any=[];
  products:any=[];
  price:any;
  totalAmount:number=0;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,
    private categoryService:CategoryService,
    private productService:ProductService,
    private snackbarService:SnackbarService,
    private billService:BillService,
  ) { }

  ngOnInit(): void {

    this.manageOrderForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      paymentMethod:[null,[Validators.required]],
      product:[null,[Validators.required]],
      category:[null,[Validators.required]],
      quantity:[null,[Validators.required]],
      price:[null,[Validators.required]],
      total:[0,[Validators.required]]
    })
  }

}
