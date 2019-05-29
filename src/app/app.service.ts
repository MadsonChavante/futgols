import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/api/api.config';
import { HttpClient } from "@angular/common/http";
import { RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private options;

  constructor(public http: HttpClient) {}

  public getClassificacao() {
    var url = `${API_CONFIG.baseUrl}/competitions/${API_CONFIG.idCompeticao}/standings`;
    return this.http.get(url);
  }
}
