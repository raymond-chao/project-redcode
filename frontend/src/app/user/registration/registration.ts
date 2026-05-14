import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    fullName: [''],
    email: [''],
    password: [''],
    confirmPassword: [''],
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      const { fullName, email, password, confirmPassword } = this.form.value; //TODO 
    }
  }

}
