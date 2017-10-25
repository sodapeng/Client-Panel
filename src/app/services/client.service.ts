import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";
import { Client } from "../models/Client";


@Injectable()
export class ClientService {
  clientsRef: AngularFireList<any>;
  clients: Observable<any[]>;
  client: Observable<any>;
  constructor(public db: AngularFireDatabase) {
    this.clientsRef = this.db.list('clients');
    this.clients = this.clientsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getClients() {
    return this.clients;
  }

  newClient(client:Client) {
    this.clientsRef.push(client);
  }

  getClient(id: string) {
    this.client = this.db.object('/clients/'+id).valueChanges();
    return this.client;
  }

  updateClient(id: string, client: Client) {
    return this.clientsRef.update(id, client);
  }

  deleteClient(id: string) {
    return this.clientsRef.remove(id);
  }

}
