import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { NgForm } from '@angular/forms';
import { CustomerModel } from '../shared/model/customer_model'
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { convertToParamMap } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {

  formValue !: FormGroup;
  customerModelObj: CustomerModel = new CustomerModel();
  customerData: any;
  showGenerate !: boolean;
  showUpdate !: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      txtCustName: ["", Validators.required],
      txtCustPhone: ["", Validators.required],
      txtCustAddress: ["", Validators.required],
      txtCustEmail: ["", Validators.required]
    });
    this.getAllCustomers();

  }

  /// Post form values to the model object
  postCustomerDetails() {

    this.customerModelObj.CustomerName = this.formValue.value.txtCustName;
    this.customerModelObj.Phone = this.formValue.value.txtCustPhone;
    this.customerModelObj.Address = this.formValue.value.txtCustAddress;
    this.customerModelObj.Email = this.formValue.value.txtCustEmail;

    ///POST API CALL
    this.api.PostCustomer(this.customerModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Customer Added!");
        let close = document.getElementById('btnclose');
        close?.click();
        this.formValue.reset();
        this.getAllCustomers();
      },
        error => {
          console.log(error);
        });
  }
  ///GET API CALL
  getAllCustomers() {
    this.api.GetCustomers()
      .subscribe(res => {
        this.customerData = res;
      })
  }
  ///DELETE API CALL
  deleteCustomer(row: any) {
    let clickedYes = confirm("Are you sure to Delete this Customer ?");
    if (clickedYes) {
      this.api.DeleteCustomer(row.customerId)
        .subscribe(res => {
          alert("Customer Deleted");
          this.getAllCustomers();
        });
    }
  }
  onEdit(row: any) {
    this.showGenerate = false;
    this.showUpdate = true;
    this.customerModelObj.CustomerId = row.customerId;
    this.formValue.controls['txtCustName'].setValue(row.customerName);
    this.formValue.controls['txtCustPhone'].setValue(row.phone);
    this.formValue.controls['txtCustAddress'].setValue(row.address);
    this.formValue.controls['txtCustEmail'].setValue(row.email);
  }
  updateCustomerDetails() {

    this.customerModelObj.CustomerName = this.formValue.value.txtCustName;
    this.customerModelObj.Phone = this.formValue.value.txtCustPhone;
    this.customerModelObj.Address = this.formValue.value.txtCustAddress;
    this.customerModelObj.Email = this.formValue.value.txtCustEmail;
    ///PUT API CALL    
    this.api.UpdateCustomer(this.customerModelObj)
      .subscribe(res => {
        alert("Updated !!")
        this.formValue.reset();
        let close = document.getElementById('btnclose');
        close?.click();
        this.formValue.reset();
        this.getAllCustomers();
      })
  }

  clickGenerate(){
    this.formValue.reset();
    this.showGenerate = true;
    this.showUpdate = false;

  }


}
