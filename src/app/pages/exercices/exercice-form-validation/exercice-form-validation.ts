import { Component, computed, effect, signal, WritableSignal } from '@angular/core';

// Expressions régulières de validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!\%*?&]{8,}$/;
const PHONE_REGEX = /^(?:(?:\+|00)33|0)[1-9](?:[\s.-]?\d{2}){4}$/;

@Component({
  imports: [],
  selector: 'app-exercice-form-validation',
  styleUrl: './exercice-form-validation.css',
  templateUrl: './exercice-form-validation.html',
})
export class ExerciceFormValidation {
  email = signal('');
  password = signal('');
  phone = signal('');

  showPassword = signal(false);

  // suivi des interactions
  emailTouched = signal(false);
  passwordTouched = signal(false);
  phoneTouched = signal(false);

  // état de soumission
  isSubmitted = signal(false);

  // validations dérivées
  isEmailValid = computed(() => EMAIL_REGEX.test(this.email()));
  isPasswordValid = computed(() => PASSWORD_REGEX.test(this.password()));
  isPhoneValid = computed(() => PHONE_REGEX.test(this.phone()));

  isFormValid = computed(
    () => this.isEmailValid() && this.isPasswordValid() && this.isPhoneValid(),
  );

  passwordScore = computed(() => {
    const value = this.password();
    let score = 0;
    if (value.length >= 8) score++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[@$!%*?&]/.test(value)) score++;
    return score;
  });

  passwordStrengthLabel = computed(() => {
    switch (this.passwordScore()) {
      case 4:
        return { text: 'Fort', class: 'progress-success' };
      case 3:
        return { text: 'Bon', class: 'progress-info' };
      case 2:
        return { text: 'Moyen', class: 'progress-warning' };
      default:
        return { text: 'Faible', class: 'progress-error' };
    }
  });

  constructor() {
    effect(() => {
      console.log('Formulaire valide :', this.isFormValid());
    });
  }

  // méthodes d'action
  onInput(
    targetSignal: WritableSignal<string>,
    touchedSignal: WritableSignal<boolean>,
    event: Event,
  ): void {
    const input = event.target as HTMLInputElement;
    targetSignal.set(input.value);
    touchedSignal.set(true);
  }

  toggleShowPassword(): void {
    this.showPassword.update((val) => !val);
  }

  submitForm(event: Event): void {
    event.preventDefault();
    this.emailTouched.set(true);
    this.passwordTouched.set(true);
    this.phoneTouched.set(true);

    if (this.isFormValid()) {
      this.isSubmitted.set(true);
    }
  }

  resetForm(): void {
    this.email.set('');
    this.password.set('');
    this.phone.set('');
    this.emailTouched.set(false);
    this.passwordTouched.set(false);
    this.phoneTouched.set(false);
    this.isSubmitted.set(false);
  }
}
