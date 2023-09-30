import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) {}
  //create data
    addStd(data:any):Observable<any>{
     return this.http.post("http://localhost:3000/student",data);

    }
    //fetch get data
    getAllStudent():Observable<any>{
      return this.http.get("http://localhost:3000/student");
    }
    //update data
    updatestudent(id:number, data:'any'):Observable<any>{
      return this.http.put(`http://localhost:3000/student/${id}`,data);
    }

    //delete data
    deletstudent(id:any):Observable<any>{
      return this.http.delete(`http://localhost:3000/student/${id}`);
    }

   
}
