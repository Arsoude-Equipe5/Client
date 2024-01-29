import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMap } from "@angular/google-maps";
import { HikeDTO, hikeType } from '../models/HikeDTO';
import { HikeCoordinatesDTO } from '../models/HikeCoordinatesDTO'; 

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
  center: google.maps.LatLngLiteral = { lat: 42, lng: -4 };
  zoom = 5;
  markers: { position: google.maps.LatLngLiteral, point: 'A' | 'B' }[] = [];
  pointALatitude: number | null = null;
  pointALongitude: number | null = null;
  pointBLatitude: number | null = null;
  pointBLongitude: number | null = null;
  selectedPoint: 'A' | 'B' | null = null;

  @ViewChild('mapAB') mapAB!: GoogleMap;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.hikeForm = this.fb.group({
      nomRandonnee: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(70)]],
      image: [null, [Validators.required, this.imageTypeValidator.bind(this)]],
      description: ['', Validators.maxLength(255)],
      type: ['', Validators.required],
      location: [''], 
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

  // Toggle Buttons: Toggle the selected point button
  choosePoint(point: 'A' | 'B') {
    if (this.selectedPoint === point) {
      this.selectedPoint = null; // Toggle off
    } else {
      this.selectedPoint = point;
    }
  }

  // Place Marker: Place markers on the map for selected points
  placeMarker(event: google.maps.MapMouseEvent) {
    if (!this.selectedPoint) {
      return;
    }

    const position: google.maps.LatLngLiteral = { lat: event.latLng!.lat(), lng: event.latLng!.lng() };

    if (this.selectedPoint === 'A') {
      this.pointALatitude = position.lat;
      this.pointALongitude = position.lng;
    } else if (this.selectedPoint === 'B') {
      this.pointBLatitude = position.lat;
      this.pointBLongitude = position.lng;
    }

    // Remove existing marker for the selected point
    const existingMarkerIndex = this.markers.findIndex(marker => marker.point === this.selectedPoint);
    if (existingMarkerIndex !== -1) {
      this.markers.splice(existingMarkerIndex, 1);
    }

    // Place new marker
    this.markers.push({ position, point: this.selectedPoint });
  }

  onSubmit(): void {
    if (this.hikeForm.valid && this.markers.length === 2) {
      const { nomRandonnee, image, description, type, location } = this.hikeForm.value;
    
      const startPoint: HikeCoordinatesDTO = {
        latitude: this.markers[0].position.lat,
        longitude: this.markers[0].position.lng,
        Time: new Date()
      };
    
      const endPoint: HikeCoordinatesDTO = {
        latitude: this.markers[1].position.lat,
        longitude: this.markers[1].position.lng,
        Time: new Date()
      };
    
      const hikeData: HikeDTO = new HikeDTO(
        nomRandonnee,
        location, // Use the location value obtained from the form
        description,
        image,
        type === 'vélo' ? hikeType.bike : hikeType.walk,
        startPoint,
        endPoint
      );
    
      console.log('Hike data sent to server:', hikeData);
    } else {
      this.hikeForm.markAllAsTouched();
    }
  }
  
  

  

  // Getters for Reactiveforms
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

  get location(){
    return this.hikeForm.get('location');
  }
}
