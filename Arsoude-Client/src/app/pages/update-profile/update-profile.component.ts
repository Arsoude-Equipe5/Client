import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { UpdateUserDTO } from 'src/app/models/UpdateUserDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  private storage: Storage = inject(Storage);
  today : string = '';

  formUpdateProfile!: FormGroup;
  imagePreview: string | undefined;
  oddBirthday: Date | undefined;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router, 

  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.initializeForm();
    this.today = formatDate(Date.now(), 'yyyy-MM-dd', 'en_US');
    }

  initializeForm(): void {
    this.formUpdateProfile = this.formBuilder.group({
      firstName: ['', [Validators.minLength(2), Validators.maxLength(40)]],
      lastName: ['', [Validators.minLength(2), Validators.maxLength(40)]],
      postalCode: ['', Validators.pattern(
        /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
      )],
      address: ['', [Validators.maxLength(100)]],
      birthdate: [''],
      profilePicture: [null], // Remove validator binding from here
      currentPassword: [''],
      newPassword: [{ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)
      ]],
      newPasswordConfirm: [{ value: '', disabled: true }, Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  
    this.togglePasswordFields();
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

  async uploadFile(file: File): Promise<string> {
    const fileName = new Date().getTime().toString() + Math.random().toString(36).substring(2);
    const filePath = `profile_pictures/${fileName}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress
        },
        (error) => {
          // Handle unsuccessful upload
          console.error('Error uploading image:', error);
          reject(error);
        },
        () => {
          // Handle successful upload
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
              reject(error);
            });
        }
      );
    });
  }

  displayImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.onload = () => {
          this.imagePreview = e.target.result;
          this.formUpdateProfile.patchValue({
            profilePicture: file
          });
          this.formUpdateProfile.get('profilePicture')?.markAsDirty();
          // Mark the profilePicture control as touched
          this.formUpdateProfile.get('profilePicture')?.markAsTouched();
        };
        image.onerror = () => {
          this.imagePreview = undefined;
          this.formUpdateProfile.patchValue({
            profilePicture: null
          });
          this.formUpdateProfile.get('profilePicture')?.setErrors({ invalidFileType: true }); // Set the error manually
          this.formUpdateProfile.get('profilePicture')?.markAsDirty();
          // Mark the profilePicture control as touched
          this.formUpdateProfile.get('profilePicture')?.markAsTouched();
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreview = undefined;
      this.formUpdateProfile.patchValue({
        profilePicture: null
      });
      this.formUpdateProfile.get('profilePicture')?.markAsDirty();
      // Mark the profilePicture control as touched
      this.formUpdateProfile.get('profilePicture')?.markAsTouched();
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
          birthdate: formatDate(user.birthDate, 'yyyy-MM-dd', 'en_US'),
          profilePicture: user.profilePicture || '' // Set initial value of profile picture input
        });
        if (user.profilePicture) {
          this.imagePreview = user.profilePicture;
        }
        console.log(user)
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('newPasswordConfirm')?.value;
    if (newPassword !== confirmPassword) {
      formGroup.get('newPasswordConfirm')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('newPasswordConfirm')?.setErrors(null);
    }
  }

  togglePasswordFields(): void {
    const currentPassword = this.formUpdateProfile.get('currentPassword')?.value;
    if (currentPassword) {
      this.formUpdateProfile.get('newPassword')?.enable();
      this.formUpdateProfile.get('newPasswordConfirm')?.enable();
    } else {
      this.formUpdateProfile.get('newPassword')?.disable();
      this.formUpdateProfile.get('newPasswordConfirm')?.disable();
    }
  }

  get profilePicture() {
    return this.formUpdateProfile.get('profilePicture');
  }

  async onSubmit(): Promise<void> {
    if (this.formUpdateProfile.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    try {
      let profilePictureURL: string | undefined = undefined; // Initialize with undefined

      const profilePictureFile = this.formUpdateProfile.get('profilePicture')?.value;
      if (profilePictureFile instanceof File) {
        // If a new profile picture is selected, upload the file
        profilePictureURL = await this.uploadFile(profilePictureFile);
      } else {
        // If no new profile picture is selected, use the current profile picture URL
        profilePictureURL = this.formUpdateProfile.get('profilePicture')?.value;
      }

      const updateUserDTO: UpdateUserDTO = {
        firstName: this.formUpdateProfile.get('firstName')?.value,
        lastName: this.formUpdateProfile.get('lastName')?.value,
        postalCode: this.formUpdateProfile.get('postalCode')?.value,
        address: this.formUpdateProfile.get('address')?.value,
        birthDate: this.formUpdateProfile.get('birthdate')?.value,
        profilePicture: profilePictureURL, // Send either the new URL or the current URL
        currentPassword: this.formUpdateProfile.get('currentPassword')?.value,
        newPassword: this.formUpdateProfile.get('newPassword')?.value,
        newPasswordConfirm: this.formUpdateProfile.get('newPasswordConfirm')?.value,
      };

      // Call updateUser with the DTO
      this.authService.updateUser(updateUserDTO).subscribe({
        next: (response: any) => {
          console.log('User updated successfully:', response);
          // Reset form and other necessary fields after successful update
          this.formUpdateProfile.reset();
          this.imagePreview = undefined;
          this.isSubmitting = false;

          this.router.navigate(['/home']);
        },
        error: (errorResponse: any) => {
          console.error('Error updating user:', errorResponse);
          this.showError(errorResponse);
          this.isSubmitting = false;
        },
      });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      this.toastr.error('Error uploading profile picture', 'Error');
      this.isSubmitting = false;
    }
  }

  showError(errorResponse: any): void {
    if (errorResponse && errorResponse.errors && errorResponse.errors.length > 0) {
      // If the server returns an array of errors
      errorResponse.errors.forEach((error: string) => {
        this.toastr.error(error, 'Error');
      });
    } else if (errorResponse && errorResponse.description) {
      // If the server returns a single error
      this.toastr.error(errorResponse.description, 'Error');
    } else {
      // If the server returns a generic error
      this.toastr.error('An error occurred.', 'Error');
    }
  }
  
}


