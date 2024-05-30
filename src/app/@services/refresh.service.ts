import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private refreshNeeded$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  getRefreshNeeded() {
    return this.refreshNeeded$.asObservable();
  }

  requestRefresh() {
    this.refreshNeeded$.next(true);
  }

  resetRefresh() {
    this.refreshNeeded$.next(false);
  }
}