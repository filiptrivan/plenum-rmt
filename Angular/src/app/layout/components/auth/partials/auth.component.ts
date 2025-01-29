import { Component, EventEmitter, Input, Output } from "@angular/core";
import { LayoutService } from "src/app/layout/services/app.layout.service";
import { CommonModule } from "@angular/common";
import { TranslocoDirective } from "@jsverse/transloco";
import { ConfigService } from "src/app/business/services/config.service";
import { GoogleButtonComponent } from '@playerty/spider';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styles: [],
  imports: [
    CommonModule,
    GoogleButtonComponent,
    TranslocoDirective,
  ],
  standalone: true,
})
export class AuthComponent {
    @Output() onCompanyNameChange: EventEmitter<string> = new EventEmitter();
    @Input() showGoogleAuth: boolean = true;

    hasGoogleAuth: boolean = this.config.googleAuth;
    companyName: string;
    image: string;

    constructor(
      public layoutService: LayoutService, 
      private config: ConfigService
    ) {

    }

    ngOnInit(){
        this.image = `assets/primeng/images/logo-dark.svg`
        this.companyName = this.config.companyName;
        this.onCompanyNameChange.next(this.companyName);
    }

    onGoogleSignIn(googleWrapper: any){
      googleWrapper.click();
    }

    ngOnDestroy(): void {

    }
}
