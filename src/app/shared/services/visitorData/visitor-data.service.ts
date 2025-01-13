import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import { AppConfigService } from '../app-config.service';
import { ReasonCountRequest, VisitCountRequest } from '../../../core/models/model-back';

@Injectable({
  providedIn: 'root'
})
export class VisitorDataService {

  private readonly visitorDataBaseUrl;

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly httpClient: HttpClient
  ) {
    this.visitorDataBaseUrl = `${this.appConfigService.baseUrl}/visitors`
  }

  // getWeeklyStats(): Observable<{ week: number; totalVisitor: number }[]> {
  //   const mockWeeklyStats = [
  //     { week: 1, totalVisitor: 150 },
  //     { week: 2, totalVisitor: 200 },
  //     { week: 3, totalVisitor: 175 },
  //     { week: 4, totalVisitor: 220 },
  //   ];
  //   return of(mockWeeklyStats);
  // }

  // getVisitorStatsByReason(): Observable<{ reason: string; Count: number }[]> {
  //   const mockVisitorStatsByReason = [
  //     { reason: 'Tourism', Count: 120 },
  //     { reason: 'Business', Count: 80 },
  //     { reason: 'Education', Count: 50 },
  //     { reason: 'Others', Count: 30 },
  //   ];
  //   return of(mockVisitorStatsByReason);
  // }


  getVisitCount(): Observable<VisitCountRequest[]> { 
    return this.httpClient.get<VisitCountRequest[]>(`${this.visitorDataBaseUrl}/visit-count`);
  }

  getReasonCount(): Observable<ReasonCountRequest[]> {
    return this.httpClient.get<ReasonCountRequest[]>(`${this.visitorDataBaseUrl}/reason-count`);
  }
}
