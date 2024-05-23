import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardValueService {
  private displayValueSource = new BehaviorSubject<string>('');
  currentDisplayValue = this.displayValueSource.asObservable();

  constructor() { }

  updateDisplayValue(value: string) {
    this.displayValueSource.next(value);
}
}