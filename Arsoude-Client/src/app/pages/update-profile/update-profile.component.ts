import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  formUpdateProfile!: FormGroup;
  imagePreview: string | undefined;
  oddBirthday : Date | undefined;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserProfile(); 
    this.initializeForm();
    console.log(this.oddBirthday);
    
  }

  initializeForm(): void {
    this.formUpdateProfile = this.formBuilder.group({
      firstName: ['', [Validators.minLength(2), Validators.maxLength(40)]],
      lastName: ['', [Validators.minLength(2), Validators.maxLength(40)]],
      postalCode: ['', [Validators.pattern(/^\d{5}$/)]],
      address: ['', [Validators.maxLength(100)]],
      birthdate: [''],
      profilePicture: [null, [this.imageTypeValidator.bind(this)]],
      currentPassword: [''],
      newPassword: ['', [Validators.minLength(6), Validators.maxLength(100), 
                         Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)]],
      newPasswordConfirm: ['']
    });
  }
  
  onSubmit(): void {
  }

  imageTypeValidator(control: any) {
    const file = control.value;
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        return { invalidFileType: true };
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const arr = new Uint8Array(e.target.result);
        let header = '';
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        if (!this.isValidImageHeader(header)) {
          control.setErrors({ invalidFileContent: true });
        } else {
          control.setErrors(null);
        }
      };
      reader.readAsArrayBuffer(file);
    }
    return null;
  }

  private isValidImageHeader(header: string): boolean {
    return header.startsWith('ffd8') || 
      header.startsWith('89504e47') || 
      header.startsWith('47494638');   
  }

  displayImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result; 
        this.formUpdateProfile.patchValue({
          profilePicture: file 
        });
        this.formUpdateProfile.get('profilePicture')?.markAsDirty(); 
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreview = undefined;
      this.formUpdateProfile.patchValue({
        profilePicture: null
      });
      this.formUpdateProfile.get('profilePicture')?.markAsDirty();
    }
  }

  getUserProfile(): void {
  this.authService.getUserInfo().subscribe({
    next: (user: any) => {
      console.log(user.birthDate); // Corrected property name
      this.formUpdateProfile.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        postalCode: user.postalCode,
        address: user.address,
        birthdate : formatDate(user.birthDate, 'yyyy-MM-dd', 'en_US') // Corrected property name
      });
      if (user.profilePicture) {
        this.imagePreview = user.profilePicture;
      }
    },
    error: (error: any) => {
      console.error(error); 
    }
  });
}


}
