import { Component, OnInit } from '@angular/core';
import { Client } from "../../models/Client";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { ClientService } from "../../services/client.service";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }
  disableBalanceOnAdd: boolean = true;
  constructor(
    private flashMessagesService:FlashMessagesService,
    private router: Router,
    private clientService: ClientService,
    private settingService: SettingsService) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}:{value:Client, valid:boolean}){
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields', {
        cssClass:'alert-danger', timeout:4000
      });
      this.router.navigate(['add-client']);
    }
    else {
      this.clientService.newClient(value);
      this.flashMessagesService.show('New client added', {
        cssClass:'alert-success', timeout:4000
      });
      this.router.navigate(['/']);
    }
  }

}
