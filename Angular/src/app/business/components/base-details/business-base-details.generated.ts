import { ValidatorService } from 'src/app/business/services/validators/validators';
import { TranslateLabelsService } from '../../services/translates/merge-labels';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, firstValueFrom, forkJoin, map, Observable, of, Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';
import { PrimengModule, SpiderControlsModule, CardSkeletonComponent, IndexCardComponent, IsAuthorizedForSaveEvent, SpiderDataTableComponent, SpiderFormArray, BaseEntity, LastMenuIconIndexClicked, SpiderFormGroup, SpiderButton, nameof, BaseFormService, getControl, Column, TableFilter, LazyLoadSelectedIdsResult, AllClickEvent, SpiderFileSelectEvent, getPrimengDropdownNamebookOptions, PrimengOption, SpiderFormControl, getPrimengAutocompleteNamebookOptions } from '@playerty/spider';
import { Notification, NotificationSaveBody, SendMessageSaveBody, UserExtendedMessage, UserExtendedSaveBody, UserExtendedVotingThemeItem, Message, UserExtended, UserNotification, VoteType, VotingTheme, VotingThemeItem, MessageSaveBody, UserExtendedMessageSaveBody, UserExtendedVotingThemeItemSaveBody, UserNotificationSaveBody, VoteTypeSaveBody, VotingThemeSaveBody, VotingThemeItemSaveBody } from '../../entities/business-entities.generated';

@Component({
    selector: 'notification-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showTitleForNotification" class="col-12">
                        <spider-textbox [control]="control('title', notificationFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showIsMarkedAsReadForNotificationDTO" class="col-12 md:col-6">
                        <spider-checkbox [control]="control('isMarkedAsRead', notificationFormGroup)"></spider-checkbox>
                    </div>
                    <div *ngIf="showDescriptionForNotification" class="col-12">
                        <spider-textarea [control]="control('description', notificationFormGroup)"></spider-textarea>
                    </div>
                    <div *ngIf="showEmailBodyForNotification" class="col-12">
                        <spider-editor [control]="control('emailBody', notificationFormGroup)"></spider-editor>
                    </div>
                    <div *ngIf="showRecipientsForNotification" class="col-12">
                        <spider-data-table 
                            [tableTitle]="t('Recipients')" 
                            [cols]="recipientsTableColsForNotification" 
                            [getTableDataObservableMethod]="getRecipientsTableDataObservableMethodForNotification" 
                            [exportTableDataToExcelObservableMethod]="exportRecipientsTableDataToExcelObservableMethodForNotification"
                            [showAddButton]="false" 
                            [readonly]="!isAuthorizedForSave"
                            selectionMode="multiple"
                            [newlySelectedItems]="newlySelectedRecipientsIdsForNotification" 
                            [unselectedItems]="unselectedRecipientsIdsForNotification" 
                            [rows]="5" 
                            (onLazyLoad)="onRecipientsLazyLoadForNotification($event)"
                            [selectedLazyLoadObservableMethod]="selectedRecipientsLazyLoadMethodForNotification" 
                            (onIsAllSelectedChange)="areAllRecipientsSelectedChangeForNotification($event)"></spider-data-table>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button *ngIf="showReturnButton" ></spider-return-button>
        </panel-footer>
    </spider-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        PrimengModule,
        SpiderControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderDataTableComponent,
    ]
})
export class NotificationBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onNotificationFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderFormGroup;
    @Input() notificationFormGroup: SpiderFormGroup<Notification>;
    @Input() additionalButtons: SpiderButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    notificationSaveBodyName: string = nameof<NotificationSaveBody>('notificationDTO');







    recipientsTableColsForNotification: Column<UserExtended>[];
    getRecipientsTableDataObservableMethodForNotification = this.apiService.getRecipientsTableDataForNotification;
    exportRecipientsTableDataToExcelObservableMethodForNotification = this.apiService.exportRecipientsTableDataToExcelForNotification;
    newlySelectedRecipientsIdsForNotification: number[] = [];
    unselectedRecipientsIdsForNotification: number[] = [];
    areAllRecipientsSelectedForNotification: boolean = null;
    lastRecipientsLazyLoadTableFilterForNotification: TableFilter;

    @Input() showTitleForNotification: boolean = true;
    @Input() showIsMarkedAsReadForNotificationDTO: boolean = true;
    @Input() showDescriptionForNotification: boolean = true;
    @Input() showEmailBodyForNotification: boolean = true;
    @Input() showRecipientsForNotification: boolean = true;


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new NotificationSaveBody();
            saveBody.notificationDTO = this.notificationFormGroup.getRawValue();



            saveBody.selectedRecipientsIds = this.newlySelectedRecipientsIdsForNotification;
            saveBody.unselectedRecipientsIds = this.unselectedRecipientsIdsForNotification;
            saveBody.areAllRecipientsSelected = this.areAllRecipientsSelectedForNotification;
            saveBody.recipientsTableFilter = this.lastRecipientsLazyLoadTableFilterForNotification;
            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveNotification;
        this.formGroup.mainDTOName = this.notificationSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];


            this.recipientsTableColsForNotification = [
                {name: this.translocoService.translate('Email'), filterType: 'text', field: 'email'  },
                {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt' , showMatchModes: true }
            ];

            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getNotificationMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initNotificationFormGroup(new Notification(mainUIFormDTO.notificationDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initNotificationFormGroup(new Notification({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initNotificationFormGroup(notification: Notification) {
        this.baseFormService.addFormGroup<Notification>(
            this.notificationFormGroup, 
            this.formGroup, 
            notification, 
            this.notificationSaveBodyName,
            []
        );
        this.notificationFormGroup.mainDTOName = this.notificationSaveBodyName;

        this.onNotificationFormGroupInitFinish.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertNotification') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateNotification') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.notificationFormGroup.controls.title.enable();
                        this.notificationFormGroup.controls.isMarkedAsRead.enable();
                        this.notificationFormGroup.controls.description.enable();
                        this.notificationFormGroup.controls.emailBody.enable();

                    }
                    else{
                        this.notificationFormGroup.controls.title.disable();
                        this.notificationFormGroup.controls.isMarkedAsRead.disable();
                        this.notificationFormGroup.controls.description.disable();
                        this.notificationFormGroup.controls.emailBody.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }





    selectedRecipientsLazyLoadMethodForNotification = (event: TableFilter): Observable<LazyLoadSelectedIdsResult> => {
        let tableFilter: TableFilter = event;
        tableFilter.additionalFilterIdLong = this.modelId;

        return this.apiService.lazyLoadSelectedRecipientsIdsForNotification(tableFilter);
    }
    areAllRecipientsSelectedChangeForNotification(event: AllClickEvent){
        this.areAllRecipientsSelectedForNotification = event.checked;
    }
    onRecipientsLazyLoadForNotification(event: TableFilter){
        this.lastRecipientsLazyLoadTableFilterForNotification = event;
    }





    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderFormArray): SpiderFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'user-extended-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showEmailForUserExtended" class="col-12 md:col-6">
                        <spider-textbox [control]="control('email', userExtendedFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showHasLoggedInWithExternalProviderForUserExtended" class="col-12 md:col-6">
                        <spider-checkbox [control]="control('hasLoggedInWithExternalProvider', userExtendedFormGroup)"></spider-checkbox>
                    </div>
                    <div *ngIf="showIsDisabledForUserExtended" class="col-12 md:col-6">
                        <spider-checkbox [control]="control('isDisabled', userExtendedFormGroup)"></spider-checkbox>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button *ngIf="showReturnButton" ></spider-return-button>
        </panel-footer>
    </spider-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        PrimengModule,
        SpiderControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderDataTableComponent,
    ]
})
export class UserExtendedBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onUserExtendedFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderFormGroup;
    @Input() userExtendedFormGroup: SpiderFormGroup<UserExtended>;
    @Input() additionalButtons: SpiderButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    userExtendedSaveBodyName: string = nameof<UserExtendedSaveBody>('userExtendedDTO');









    @Input() showEmailForUserExtended: boolean = true;
    @Input() showHasLoggedInWithExternalProviderForUserExtended: boolean = true;
    @Input() showIsDisabledForUserExtended: boolean = true;


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new UserExtendedSaveBody();
            saveBody.userExtendedDTO = this.userExtendedFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveUserExtended;
        this.formGroup.mainDTOName = this.userExtendedSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];




            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getUserExtendedMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initUserExtendedFormGroup(new UserExtended(mainUIFormDTO.userExtendedDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initUserExtendedFormGroup(new UserExtended({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initUserExtendedFormGroup(userExtended: UserExtended) {
        this.baseFormService.addFormGroup<UserExtended>(
            this.userExtendedFormGroup, 
            this.formGroup, 
            userExtended, 
            this.userExtendedSaveBodyName,
            []
        );
        this.userExtendedFormGroup.mainDTOName = this.userExtendedSaveBodyName;

        this.onUserExtendedFormGroupInitFinish.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertUserExtended') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateUserExtended') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.userExtendedFormGroup.controls.email.enable();
                        this.userExtendedFormGroup.controls.hasLoggedInWithExternalProvider.enable();
                        this.userExtendedFormGroup.controls.isDisabled.enable();

                    }
                    else{
                        this.userExtendedFormGroup.controls.email.disable();
                        this.userExtendedFormGroup.controls.hasLoggedInWithExternalProvider.disable();
                        this.userExtendedFormGroup.controls.isDisabled.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }











    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderFormArray): SpiderFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'vote-type-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showNameForVoteType" class="col-12 md:col-6">
                        <spider-textbox [control]="control('name', voteTypeFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showIconForVoteType" class="col-12 md:col-6">
                        <spider-textbox [control]="control('icon', voteTypeFormGroup)"></spider-textbox>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button *ngIf="showReturnButton" ></spider-return-button>
        </panel-footer>
    </spider-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        PrimengModule,
        SpiderControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderDataTableComponent,
    ]
})
export class VoteTypeBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onVoteTypeFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderFormGroup;
    @Input() voteTypeFormGroup: SpiderFormGroup<VoteType>;
    @Input() additionalButtons: SpiderButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(true);
    isAuthorizedForSave: boolean = true;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    voteTypeSaveBodyName: string = nameof<VoteTypeSaveBody>('voteTypeDTO');









    @Input() showNameForVoteType: boolean = true;
    @Input() showIconForVoteType: boolean = true;


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new VoteTypeSaveBody();
            saveBody.voteTypeDTO = this.voteTypeFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveVoteType;
        this.formGroup.mainDTOName = this.voteTypeSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];




            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getVoteTypeMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initVoteTypeFormGroup(new VoteType(mainUIFormDTO.voteTypeDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initVoteTypeFormGroup(new VoteType({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initVoteTypeFormGroup(voteType: VoteType) {
        this.baseFormService.addFormGroup<VoteType>(
            this.voteTypeFormGroup, 
            this.formGroup, 
            voteType, 
            this.voteTypeSaveBodyName,
            []
        );
        this.voteTypeFormGroup.mainDTOName = this.voteTypeSaveBodyName;

        this.onVoteTypeFormGroupInitFinish.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertVoteType') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateVoteType') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.voteTypeFormGroup.controls.name.enable();
                        this.voteTypeFormGroup.controls.icon.enable();

                    }
                    else{
                        this.voteTypeFormGroup.controls.name.disable();
                        this.voteTypeFormGroup.controls.icon.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }











    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderFormArray): SpiderFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'voting-theme-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showNameForVotingTheme" class="col-12">
                        <spider-textbox [control]="control('name', votingThemeFormGroup)"></spider-textbox>
                    </div>
                    <div *ngIf="showDescriptionForVotingTheme" class="col-12">
                        <spider-textarea [control]="control('description', votingThemeFormGroup)"></spider-textarea>
                    </div>
                     <div *ngIf="showVotingThemeItemsForVotingTheme" class="col-12">
                        <spider-panel [toggleable]="true" [collapsed]="votingThemeItemsPanelCollapsed">
                            <panel-header [title]="t('VotingThemeItems')" icon="pi pi-list"></panel-header>
                            <panel-body [normalBottomPadding]="true">
                                @for (votingThemeItemFormGroup of getFormArrayGroups(votingThemeItemsFormArray); track votingThemeItemFormGroup; let index = $index; let last = $last) {
                                    <index-card 
                                    [index]="index" 
                                    [last]="false" 
                                    [crudMenu]="votingThemeItemsCrudMenu" 
                                    [showCrudMenu]="isAuthorizedForSave"
                                    (onMenuIconClick)="votingThemeItemsLastIndexClicked.index = $event"
                                    >
                                        <form [formGroup]="votingThemeItemFormGroup" class="grid">
                    <div  class="col-12">
                        <spider-textbox [control]="control('name', votingThemeItemFormGroup)"></spider-textbox>
                    </div>
                    <div  class="col-12">
                        <spider-textarea [control]="control('description', votingThemeItemFormGroup)"></spider-textarea>
                    </div>
                                        </form>
                                    </index-card>
                                }

                                <div class="panel-add-button">
                                    <spider-button [disabled]="!isAuthorizedForSave" (onClick)="addNewItemToVotingThemeItems(null)" [label]="t('AddNewVotingThemeItem')" icon="pi pi-plus"></spider-button>
                                </div>

                            </panel-body>
                        </spider-panel>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spider-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spider-button>
            @for (button of additionalButtons; track button.label) {
                <spider-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spider-button>
            }
            <spider-return-button *ngIf="showReturnButton" ></spider-return-button>
        </panel-footer>
    </spider-panel>
</ng-container>
    `,
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        PrimengModule,
        SpiderControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderDataTableComponent,
    ]
})
export class VotingThemeBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onVotingThemeFormGroupInitFinish = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderFormGroup;
    @Input() votingThemeFormGroup: SpiderFormGroup<VotingTheme>;
    @Input() additionalButtons: SpiderButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(true);
    isAuthorizedForSave: boolean = true;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    votingThemeSaveBodyName: string = nameof<VotingThemeSaveBody>('votingThemeDTO');

    votingThemeItemsModel = new VotingThemeItem();
    votingThemeItemsSaveBodyName: string = nameof<VotingThemeSaveBody>('votingThemeItemsDTO');
    votingThemeItemsTranslationKey: string = new VotingThemeItem().typeName;
    votingThemeItemsFormArray: SpiderFormArray<VotingThemeItem>;
    votingThemeItemsLastIndexClicked = new LastMenuIconIndexClicked();
    votingThemeItemsCrudMenu: MenuItem[] = [];
    @Input() votingThemeItemsPanelCollapsed: boolean = false;







    @Input() showNameForVotingTheme: boolean = true;
    @Input() showDescriptionForVotingTheme: boolean = true;
    @Input() showVotingThemeItemsForVotingTheme: boolean = true;


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new VotingThemeSaveBody();
            saveBody.votingThemeDTO = this.votingThemeFormGroup.getRawValue();
            saveBody.votingThemeItemsDTO = this.votingThemeItemsFormArray.getRawValue();



            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveVotingTheme;
        this.formGroup.mainDTOName = this.votingThemeSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];




            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getVotingThemeMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initVotingThemeFormGroup(new VotingTheme(mainUIFormDTO.votingThemeDTO));
                    this.initVotingThemeItemsFormArray(mainUIFormDTO.orderedVotingThemeItemsDTO);


                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initVotingThemeFormGroup(new VotingTheme({id: 0}));
                this.initVotingThemeItemsFormArray([]);
                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initVotingThemeFormGroup(votingTheme: VotingTheme) {
        this.baseFormService.addFormGroup<VotingTheme>(
            this.votingThemeFormGroup, 
            this.formGroup, 
            votingTheme, 
            this.votingThemeSaveBodyName,
            []
        );
        this.votingThemeFormGroup.mainDTOName = this.votingThemeSaveBodyName;

        this.onVotingThemeFormGroupInitFinish.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertVotingTheme') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateVotingTheme') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.votingThemeFormGroup.controls.name.enable();
                        this.votingThemeFormGroup.controls.description.enable();
                        this.baseFormService.enableAllFormControls(this.votingThemeItemsFormArray);

                    }
                    else{
                        this.votingThemeFormGroup.controls.name.disable();
                        this.votingThemeFormGroup.controls.description.disable();
                        this.baseFormService.disableAllFormControls(this.votingThemeItemsFormArray);

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }

    initVotingThemeItemsFormArray(votingThemeItems: VotingThemeItem[]){
        this.votingThemeItemsFormArray = this.baseFormService.initFormArray(
            this.formGroup, 
            votingThemeItems, 
            this.votingThemeItemsModel, 
            this.votingThemeItemsSaveBodyName, 
            this.votingThemeItemsTranslationKey, 
            true
        );
        this.votingThemeItemsCrudMenu = this.getCrudMenuForOrderedData(this.votingThemeItemsFormArray, new VotingThemeItem({id: 0}), this.votingThemeItemsLastIndexClicked, false);
        this.votingThemeItemsFormArray.validator = this.validatorService.isFormArrayEmpty(this.votingThemeItemsFormArray);
    }

    addNewItemToVotingThemeItems(index: number){ 
        this.baseFormService.addNewFormGroupToFormArray(
            this.votingThemeItemsFormArray, 
            new VotingThemeItem({id: 0}), 
            index
        );
    }







    control(formControlName: string, formGroup: SpiderFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderFormArray): SpiderFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}
