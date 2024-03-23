  import { HttpClient, HttpParams } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import * as SignalR from '@microsoft/signalr';
  import {EXPLORATORY_ANALYSIS_HUB_URL, REGRESSION_ANALYSIS_HUB_URL} from "../../core/constants/api-endpoints";
  @Injectable({
    providedIn: 'root',
  })
  export class DataAnalyticsService {
    private exploratoryHubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(EXPLORATORY_ANALYSIS_HUB_URL, {
        skipNegotiation: true,
        transport: SignalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    private regressionHubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(REGRESSION_ANALYSIS_HUB_URL, {
        skipNegotiation: true,
        transport: SignalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    constructor(private http: HttpClient) {}

    startExploratoryConnection() {
      return this.exploratoryHubConnection.start();
    }
    startRegressionConnection() {
      return this.regressionHubConnection.start();
    }

    registerRegressionEvent(eventName: string, callback: (...args: any[]) => void) {
      if (this.regressionHubConnection.state === SignalR.HubConnectionState.Connected) {
        this.regressionHubConnection.on(eventName, callback)      } else {
        console.warn('register regression event SignalR connection is not established. Payload not sent.');
      }
    }
    sendExploratoryRequest(methodName: string, payload: any): void {
      // Check if connection is in a connected state
      if (this.exploratoryHubConnection.state === SignalR.HubConnectionState.Connected) {
        // Invoke server method with payload
         this.exploratoryHubConnection.invoke(methodName, payload).then(() => {
        }
)
      } else {
        console.warn('send exploratory request SignalR connection is not established. Payload not sent.' + this.exploratoryHubConnection.state);
      }
    }
    sendRegressionRequest(methodName: string, payload: any ): void {
      // Check if connection is in a connected state
      if (this.regressionHubConnection.state === SignalR.HubConnectionState.Connected) {
        // Invoke server method with payload
        this.regressionHubConnection.invoke(methodName, payload).then(() => {
        })
      }else {
        console.warn('send regression request SignalR connection is not established. Payload not sent.');
        }
      }

    registerExploratoryEvent(eventName: string, callback: (...args: any[]) => void) {
      if(this.exploratoryHubConnection.state === SignalR.HubConnectionState.Connected) {
        this.exploratoryHubConnection.on(eventName, callback);

      } else {
        console.warn('SignalR connection is not established for exploratory analysis. Payload not sent.');
      }
    }

    stopConnection() {
      this.regressionHubConnection.stop();
      this.exploratoryHubConnection.stop();
    }
  }
