import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public baseUrl: string = 'http://localhost:8080/api';

  // constructor(
  //   private readonly httpClient: HttpClient
  // ) {
  //   this.baseUrl = '/api';
  //   this.keyCloakUrl = '';
  //   this.keyCloakRealm = '';
  //   this.keyCloakClientId = '';
  //  }
}
