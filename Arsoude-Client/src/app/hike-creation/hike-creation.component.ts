import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hike-creation',
  templateUrl: './hike-creation.component.html',
  styleUrls: ['./hike-creation.component.css']
})
export class HikeCreationComponent implements OnInit {
  hikeForm!: FormGroup;
  hikeTypes: string[] = ['vélo', 'marche']; // Define hikeTypes array
  imagePreview: string | undefined; // Variable to store the image preview data URL
  imageSelected: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.hikeForm = this.fb.group({
      nomRandonnee: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(70)]],
      image: [null, [Validators.required, this.imageTypeValidator.bind(this)]], // Add image type validator
      description: ['', Validators.maxLength(255)],
      type: ['', Validators.required], // Ensure type form control is defined
      pointDepart: ['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      pointArrivee: ['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]]
    });
  }

  // Custom validator function to check if image is selected and is of valid type
  imageTypeValidator(control: any) {
    const file = control.value;
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        return { invalidFileType: true };
      }
      // Check for magic numbers (BINARY oOo) to ensure file content is actually an image
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
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

  // Check if the provided header matches any of the valid image headers
  private isValidImageHeader(header: string): boolean {
    return header.startsWith('ffd8') || // JPEG
           header.startsWith('89504e47') || // PNG
           header.startsWith('47494638');   // GIF
  }

  //to display the image from the user's files
  displayImage(event: any): void {
    this.imageSelected = true; // Set the flag to true when an image is selected
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result; // Set image preview data URL
        this.hikeForm.patchValue({
          image: file // Store the file object itself, not the data URL
        });
        this.hikeForm.get('image')?.markAsDirty(); // Mark control as dirty to trigger validation
      };
      reader.readAsDataURL(file);
    } else {
      // If no file selected, reset the image control value and image preview
      this.imagePreview = undefined;
      this.hikeForm.patchValue({
        image: null
      });
      this.hikeForm.get('image')?.markAsDirty();
    }
  }
  
  //what happens when the form gets submitted
  onSubmit(): void {
    if (this.hikeForm.valid) {
      // Trim the values of description and nomRandonnee
      const trimmedValues = {
        ...this.hikeForm.value,
        description: this.hikeForm.value.description.trim(),
        nomRandonnee: this.hikeForm.value.nomRandonnee.trim()
      };
  
      console.log('Form submitted successfully!', trimmedValues);
      // Here you can send the trimmedValues object to the server
    } else {
      this.hikeForm.markAllAsTouched();
    }
  }
  

  //gets for the Reactiveforms
  get nomRandonnee() {
    return this.hikeForm.get('nomRandonnee');
  }

  get image() {
    return this.hikeForm.get('image');
  }

  get description() {
    return this.hikeForm.get('description');
  }

  get type() {
    return this.hikeForm.get('type');
  }

  get pointDepart() {
    return this.hikeForm.get('pointDepart');
  }

  get pointArrivee() {
    return this.hikeForm.get('pointArrivee');
  }
}
