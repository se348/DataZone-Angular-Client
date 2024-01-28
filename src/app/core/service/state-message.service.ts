import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateMessageService {
  private stateMessageSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  setStateMessage(message: string): void {
    this.stateMessageSubject.next(message);
  }

  getStateMessage(): Observable<string | null> {
    return this.stateMessageSubject.asObservable();
  }
}
