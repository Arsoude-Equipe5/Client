import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMap } from "@angular/google-maps";
import { HikeDTO, hikeType } from '../models/HikeDTO';
import { HikeCoordinatesDTO } from '../models/HikeCoordinatesDTO'; 
import { HikeService } from '../services/HikeServices';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hike-creation',
  templateUrl: './hike-creation.component.html',
  styleUrls: ['./hike-creation.component.css']
})
export class HikeCreationComponent implements OnInit {

  private storage: Storage = inject(Storage);

  hikeForm!: FormGroup;
  hikeTypes: string[] = ['vélo', 'marche'];
  imagePreview: string | undefined;
  imageSelected: boolean = false;
  center: google.maps.LatLngLiteral = { lat: 42, lng: -4 };
  zoom = 5;
  markers: { position: google.maps.LatLngLiteral, point: 'A' | 'B' }[] = [];
  pointALatitude: number | null = null;
  pointALongitude: number | null = null;
  pointBLatitude: number | null = null;
  pointBLongitude: number | null = null;
  selectedPoint: 'A' | 'B' | null = null;
  language: string = "fr";

  @ViewChild('mapAB') mapAB!: GoogleMap;

  constructor(private fb: FormBuilder, private hikeService: HikeService, public translator: TranslateService) {
    translator.setDefaultLang(this.language);
   }

  ngOnInit(): void {
    //uncomment when testing hikeCreation
    this.createForm();
  }

  uploadFile(input: HTMLInputElement) {
    if (!input.files) return

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
            const storageRef = ref(this.storage, file.name);
            uploadBytesResumable(storageRef, file);
        }
    }
  }

  selectHikeType(type: string) {
    this.hikeForm.patchValue({ type: type });
    this.hikeForm.controls['type'].markAsTouched();
  }
  

  createForm(): void {
    this.hikeForm = this.fb.group({
      nomRandonnee: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(70)]],
      image: [null, [Validators.required, this.imageTypeValidator.bind(this)]],
      description: ['', Validators.maxLength(255)],
      location: ['', Validators.required],
      type: ['', [Validators.required, Validators.pattern('vélo|marche')]], // Add validation for type field

    });
  }

  isFormValid(): boolean {
    return this.hikeForm.valid && this.markers.length === 2;
  }
  
  arePointsSelected(): boolean {
    return this.pointALatitude !== null && this.pointALongitude !== null && this.pointBLatitude !== null && this.pointBLongitude !== null;
  } 

  imageTypeValidator(control: any) {
    const file = control.value;
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        return { invalidFileType: true };
      }
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

  private isValidImageHeader(header: string): boolean {
    return header.startsWith('ffd8') || 
      header.startsWith('89504e47') || 
      header.startsWith('47494638');   
  }

  displayImage(event: any): void {
    this.imageSelected = true; 
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result; 
        this.hikeForm.patchValue({
          image: file 
        });
        this.hikeForm.get('image')?.markAsDirty(); 
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreview = undefined;
      this.hikeForm.patchValue({
        image: null
      });
      this.hikeForm.get('image')?.markAsDirty();
    }
  }

  choosePoint(point: 'A' | 'B') {
    if (this.selectedPoint === point) {
      this.selectedPoint = null; 
    } else {
      this.selectedPoint = point;
    }
  }

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

    const existingMarkerIndex = this.markers.findIndex(marker => marker.point === this.selectedPoint);
    if (existingMarkerIndex !== -1) {
      this.markers.splice(existingMarkerIndex, 1);
    }

    this.markers.push({ position, point: this.selectedPoint });
  }


  hikeType: string = '';
  setHikeType(type: string) {
    this.hikeType = type;
    this.hikeForm.patchValue({ type: type });
    this.hikeForm.controls['type'].markAsTouched();
  }
  

  async onSubmit(): Promise<void> {
    if (this.hikeForm.valid && this.markers.length === 2) {
      const { nomRandonnee, image, description, type, location } = this.hikeForm.value;
    
      // Upload image to Firebase Storage
      const filePath = `images/${image.name}`;
      const storageRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, image);
      
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Handle progress
        },
        (error) => {
          // Handle unsuccessful upload
          console.error('Error uploading image:', error);
        },
        async () => {
          // Handle successful upload
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Create HikeDTO with image URL
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
            location,
            description,
            downloadURL, // Use download URL as image URL
            type === 'vélo' ? hikeType.bike : hikeType.walk,
            startPoint,
            endPoint
          );
        
          // Send HikeDTO to server
          this.hikeService.createHike(hikeData).subscribe(
            (response: any) => {
              console.log('Hike created successfully:', response);
              console.log(hikeData)
              // Optionally, you can perform any additional actions here after hike creation
            },
            (error: any) => {
              console.error('Error creating hike:', error);
              console.log(hikeData)
            }
          );
        }
      );
    } else {
      this.hikeForm.markAllAsTouched();
    }
  }

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
