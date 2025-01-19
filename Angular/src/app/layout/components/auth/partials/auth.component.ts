import { Component, EventEmitter, Input, Output } from "@angular/core";
import { environment } from "src/environments/environment";
import { LayoutService } from "src/app/layout/services/app.layout.service";
import { GoogleButtonComponent } from "../../../../core/components/google-button/google-button.component";
import { CommonModule } from "@angular/common";
import { getHtmlImgDisplayString64 } from "src/app/core/services/helper-functions";
import { Subscription } from "rxjs";
import { TranslocoDirective } from "@jsverse/transloco";

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

    hasGoogleAuth: boolean = environment.googleAuth;
    companyName: string;
    image: string;

    constructor(public layoutService: LayoutService) {}

    ngOnInit(){
        this.image = `assets/primeng/images/logo-dark.svg`
        this.companyName = environment.companyName;
        this.onCompanyNameChange.next(this.companyName);
    }

    onGoogleSignIn(googleWrapper: any){
      googleWrapper.click();
    }

    ngOnDestroy(): void {

    }
}
