import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisitorDataService {

  constructor() {}

  getWeeklyStats(): Observable<{ week: number; totalVisitor: number }[]> {
    const mockWeeklyStats = [
      { week: 1, totalVisitor: 150 },
      { week: 2, totalVisitor: 200 },
      { week: 3, totalVisitor: 175 },
      { week: 4, totalVisitor: 220 },
    ];
    return of(mockWeeklyStats);
  }

  getVisitorStatsByReason(): Observable<{ reason: string; Count: number }[]> {
    const mockVisitorStatsByReason = [
      { reason: 'Tourism', Count: 120 },
      { reason: 'Business', Count: 80 },
      { reason: 'Education', Count: 50 },
      { reason: 'Others', Count: 30 },
    ];
    return of(mockVisitorStatsByReason);
  }
}
