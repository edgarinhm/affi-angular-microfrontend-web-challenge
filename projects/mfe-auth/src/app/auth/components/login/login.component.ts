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
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly router = inject(Router);
  commonsLibService = inject(CommonsLibService);
  loginForm!: FormGroup;
  formValidity = signal(false);

  constructor(private readonly fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // Subscribe to form-level status changes
    this.loginForm.statusChanges.subscribe(() => {
      this.formValidity.set(this.loginForm.valid);
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user = { ...this.loginForm.value };
      this.commonsLibService.signIn(user as IUser);
      this.router.navigate(['/']);
    }
  }
}
