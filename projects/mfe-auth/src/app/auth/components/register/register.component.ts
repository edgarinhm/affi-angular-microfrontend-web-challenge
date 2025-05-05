import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonsLibService, IUser } from '@commons-lib';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly router = inject(Router);
  commonsLibService = inject(CommonsLibService);
  formValidity = signal(false);
  registerForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // Subscribe to form-level status changes
    this.registerForm.statusChanges.subscribe(() => {
      this.formValidity.set(this.registerForm.valid);
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user = { ...this.registerForm.value };
      this.commonsLibService.signIn(user as IUser);
      this.router.navigate(['/']);
    }
  }
}
