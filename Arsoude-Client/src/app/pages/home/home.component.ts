import { Component, OnInit , HostListener, ElementRef, AfterViewInit, Renderer2  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HikeService } from 'src/app/services/HikeServices';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HikeDTO } from 'src/app/models/HikeDTO';
import { HikePathDTO } from 'src/app/models/HikePathDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('foldAnimation', [
      state('folded', style({
        transform: 'perspective(600px) rotateX(90deg)' // Define folded state
      })),
      state('flat', style({
        transform: 'perspective(600px) rotateX(0deg)' // Define flat state
      })),
      transition('folded <=> flat', animate('500ms ease-out')) // Transition animation with a duration of 500ms
    ])
  ]
})
export class HomeComponent implements OnInit {
  language: string = "fr";
  boxSize: number = 100;
  boxOpacity: number = 0;
  heroPosition: number = 700;
  foldState: string = 'folded';
  foldedRotation: number = 90;
  showScrollButton: boolean = false;
  hikes: HikePathDTO[] =[];

  inputKeyword = new FormControl('');

  constructor(private auth: AuthService, public translator: TranslateService, public hikeService:HikeService, private el: ElementRef){
    translator.setDefaultLang(this.language);
    this.hikeService.getHikes();
    //this.calculateHeroPosition();
  }

  ngOnInit(){
    //this.hikeService.getHikes().then(this.sliceList);
  }

  sliceList(){
    this.hikes = this.hikeService.hikeList;
    this.hikes.slice(0, 3);
    console.log(this.hikes);
  }

  calculateHeroPosition() {
    const heroElement = this.el.nativeElement.querySelector('#HeroMap');
    // Calculate its position relative to the top of the window
    this.heroPosition = heroElement.getBoundingClientRect().top + window.scrollY;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPos = window.scrollY;
    const heroScrollPosition = window.scrollY - this.heroPosition;
    this.showScrollButton = scrollPos > 130;
    // Example logic to adjust box size and opacity based on scroll position
    this.boxSize = Math.min(10, 50 + heroScrollPosition * 0.001);
    this.boxOpacity = Math.min(1, heroScrollPosition * 0.01);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ngOnInit(): void {

  //   // this.auth.getHikes().subscribe({

  //   // next:(res)=>{

  //   //   console.log(res);
      

  //   // },
  //   // error:(err)=>{console.log(err);
  //   // }
  //   // })

  // }

  changeLanguage(lang:string):void{
    this.language = lang;
    this.translator.use(this.language);
  }




}
