import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServerservService {
// resetToken='';
// resetEmail='';
// expiry=null;
  constructor(private http:HttpClient) { }
  login(data):Observable<any>{
    return this.http.post(`${environment.url}/login`,data);
  }
  register(data):Observable<any>{
    return this.http.post(`${environment.url}/register`,data);
  }
  findAccount(data):Observable<any>{
    return this.http.post(`${environment.url}/findbyemail`,data)
  }
  sendVerifictionMail(data):Observable<any>{
    return this.http.post(`${environment.url}/forgot`,data)
  }
  updateResetValInService(data){
    localStorage.setItem('resetToken',data['token'])
    localStorage.setItem('resetEmail',data['email'])
    localStorage.setItem('expiry',data['expiry'])
    localStorage.setItem('timestamp',data['timestamp'])
  }
  getResetDataFromLocalStorage(){
    let data={
      resetToken:localStorage.getItem('resetToken'),
      resetEmail:localStorage.getItem('resetEmail'),
      expiry:localStorage.getItem('expiry'),
      timestamp:localStorage.getItem('timestamp')
    }
    return data;
  }
  resetPassword(data):Observable<any>{
    return this.http.post(`${environment.url}/resetpassword`,data)
  }
}
