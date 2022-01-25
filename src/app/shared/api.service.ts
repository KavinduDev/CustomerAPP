import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public invoiceApiUrl : string = "https://localhost:44320/api/Customers/";

  constructor(private http : HttpClient) { }

  // Create
  PostCustomer(data:any){
    return this.http.post<any>(`${this.invoiceApiUrl}createCustomer`,data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  // Read
  GetCustomers(){
    return this.http.get<any>(`${this.invoiceApiUrl}getAllCustomers`)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  GetCustomerById(id:number){
    return this.http.get<any>(`${this.invoiceApiUrl}getCustomer/`+id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  // Update
  UpdateCustomer(data:any){
    return this.http.put<any>(`${this.invoiceApiUrl}updateCustomer/`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  //Delete
  DeleteCustomer(id:number){
    return this.http.delete<any>(`${this.invoiceApiUrl}deleteCustomer/`+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
