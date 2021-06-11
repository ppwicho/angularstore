import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  emailField : FormControl;
  constructor() { 
    this.emailField= new FormControl('',
    [
      Validators.required, Validators.email
    ]
    );
    // this.emailField.valueChanges
    // .subscribe(value => {
    //   console.log(value);
    // });
  }

  ngOnInit(): void {
  }
  sendMail(){
    if(this.emailField.valid){
      console.log(this.emailField.value);
    }
  }
  getErrorMessage(){
    if (this.emailField.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailField.hasError('email') ? 'Not a valid email' : '';
  }

}
