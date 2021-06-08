import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './components/contact/contact.component';


@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ContactModule { }
