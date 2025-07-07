import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { User } from 'src/app/business/entities/business-entities.generated';
import { BaseFormCopy, SpiderlyFormGroup, SpiderlyMessageService, BaseFormService, IsAuthorizedForSaveEvent } from 'spiderly';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { combineLatest, map, Observable } from 'rxjs';
import { BusinessPermissionCodes } from 'src/app/business/enums/business-enums.generated';

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html',
    standalone: false,
    styles: [],
})
export class UserDetailsComponent extends BaseFormCopy implements OnInit {
    userFormGroup = new SpiderlyFormGroup<User>({});

    showIsDisabledControl: boolean = false;
    showHasLoggedInWithExternalProvider: boolean = false;

    isAuthorizedForSave: boolean = false;

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SpiderlyMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override baseFormService: BaseFormService,
        private authService: AuthService
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }

    override ngOnInit() {

    }

    authorizedForSaveObservable = (): Observable<boolean> => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authService.user$]).pipe(
            map(([currentUserPermissionCodes, currentUser]) => {
                if (currentUserPermissionCodes != null && currentUser != null) {
                    const IsDisabledAndExternalLoggedInControls = this.showIsDisabledAndExternalLoggedInControlsForPermissions(currentUserPermissionCodes);
                    this.showIsDisabledControl = IsDisabledAndExternalLoggedInControls;
                    this.showHasLoggedInWithExternalProvider = IsDisabledAndExternalLoggedInControls;
                    return this.isCurrentUserPage(currentUser.id);
                }

                return false;
            })
        );
    }

    showIsDisabledAndExternalLoggedInControlsForPermissions = (currentUserPermissionCodes: string[]) => {
        return currentUserPermissionCodes.includes(BusinessPermissionCodes.ReadUser) ||
               currentUserPermissionCodes.includes(BusinessPermissionCodes.UpdateUser);
    }

    isCurrentUserPage = (currentUserId: number) => {
        return currentUserId === this.userFormGroup.getRawValue().id;
    }

    isAuthorizedForSaveChange = (event: IsAuthorizedForSaveEvent) => {
        this.isAuthorizedForSave = event.isAuthorizedForSave;

        this.userFormGroup.controls.hasLoggedInWithExternalProvider.disable();
    }

    override onBeforeSave = (): void => {

    }
}

