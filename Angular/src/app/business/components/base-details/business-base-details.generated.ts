import { ValidatorService } from 'src/app/business/services/validators/validators';
import { TranslateLabelsService } from '../../services/translates/merge-labels';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, forkJoin, Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { PrimengModule, SpiderControlsModule, CardSkeletonComponent, IndexCardComponent, SpiderDataTableComponent, SpiderFormArray, BaseEntity, LastMenuIconIndexClicked, SpiderFormGroup, SpiderButton, nameof, BaseFormService, getControl, Column, TableFilter, LazyLoadSelectedIdsResult, AllClickEvent, SpiderFileSelectEvent, getPrimengNamebookListForDropdown, PrimengOption, SpiderFormControl, getPrimengNamebookListForAutocomplete } from '@playerty/spider';
import { Notification, NotificationSaveBody, SendMessageSaveBody, UserExtendedMessage, UserExtendedSaveBody, UserExtendedVotingThemeItem, Message, UserExtended, UserNotification, VoteType, VotingTheme, VotingThemeItem, MessageSaveBody, UserExtendedMessageSaveBody, UserExtendedVotingThemeItemSaveBody, UserNotificationSaveBody, VoteTypeSaveBody, VotingThemeSaveBody, VotingThemeItemSaveBody } from '../../entities/business-entities.generated';

@Component({
    selector: 'notification-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12">
                        <spider-textbox [control]="control('title', notificationFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-checkbox [control]="control('isMarkedAsRead', notificationFormGroup)"></spider-checkbox>
                    </div>
                    <div class="col-12">
                        <spider-textarea [control]="control('description', notificationFormGroup)"></spider-textarea>
                    </div>
                    <div class="col-12">
                        <spider-editor [control]="control('emailBody', notificationFormGroup)"></spider-editor>
                    </div>
                    <div class="col-12">
                        <spider-data-table 
                            [tableTitle]="t('RecipientsForNotification')" 
                            [cols]="recipientsTableColsForNotification" 
                            [getTableDataObservableMethod]="getRecipientsTableDataObservableMethodForNotification" 
                            [exportTableDataToExcelObservableMethod]="exportRecipientsTableDataToExcelObservableMethodForNotification"
                            [showAddButton]="false" 
                            selectionMode="multiple"
                            [newlySelectedItems]="newlySelectedRecipientsIdsForNotification" 
                            [unselectedItems]="unselectedRecipientsIdsForNotification" 
                            [rows]="5" 
                            (onLazyLoad)="onRecipientsLazyLoadForNotification($event)"
                            [selectedLazyLoadObservableMethod]="selectedRecipientsLazyLoadMethodForNotification" 
                            (onIsAllSelectedChange)="areAllRecipientsSelectedChangeForNotification($event)"></spider-data-table>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <p-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></p-button>
            @for (button of additionalButtons; track button.label) {
                <p-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></p-button>
            }
            <spider-return-button></spider-return-button>
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

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
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
                    notification: this.apiService.getNotification(this.modelId),


                })
                .subscribe(({ notification }) => {
                    this.initNotificationFormGroup(new Notification(notification));



                });
            }
            else{
                this.initNotificationFormGroup(new Notification({id: 0}));

            }
        });
    }

    initNotificationFormGroup(notification: Notification) {
        this.baseFormService.initFormGroup<Notification>(
            this.notificationFormGroup, 
            this.formGroup, 
            notification, 
            this.notificationSaveBodyName,
            []
        );
        this.notificationFormGroup.mainDTOName = this.notificationSaveBodyName;
        this.loading = false;
        this.onNotificationFormGroupInitFinish.next();
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

}

@Component({
    selector: 'user-extended-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('email', userExtendedFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-checkbox [control]="control('hasLoggedInWithExternalProvider', userExtendedFormGroup)"></spider-checkbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-checkbox [control]="control('isDisabled', userExtendedFormGroup)"></spider-checkbox>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <p-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></p-button>
            @for (button of additionalButtons; track button.label) {
                <p-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></p-button>
            }
            <spider-return-button></spider-return-button>
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
    modelId: number;
    loading: boolean = true;

    userExtendedSaveBodyName: string = nameof<UserExtendedSaveBody>('userExtendedDTO');









    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
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
                    userExtended: this.apiService.getUserExtended(this.modelId),


                })
                .subscribe(({ userExtended }) => {
                    this.initUserExtendedFormGroup(new UserExtended(userExtended));



                });
            }
            else{
                this.initUserExtendedFormGroup(new UserExtended({id: 0}));

            }
        });
    }

    initUserExtendedFormGroup(userExtended: UserExtended) {
        this.baseFormService.initFormGroup<UserExtended>(
            this.userExtendedFormGroup, 
            this.formGroup, 
            userExtended, 
            this.userExtendedSaveBodyName,
            []
        );
        this.userExtendedFormGroup.mainDTOName = this.userExtendedSaveBodyName;
        this.loading = false;
        this.onUserExtendedFormGroupInitFinish.next();
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

}

@Component({
    selector: 'vote-type-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('name', voteTypeFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12 md:col-6">
                        <spider-textbox [control]="control('icon', voteTypeFormGroup)"></spider-textbox>
                    </div>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <p-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></p-button>
            @for (button of additionalButtons; track button.label) {
                <p-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></p-button>
            }
            <spider-return-button></spider-return-button>
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
    modelId: number;
    loading: boolean = true;

    voteTypeSaveBodyName: string = nameof<VoteTypeSaveBody>('voteTypeDTO');









    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
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
                    voteType: this.apiService.getVoteType(this.modelId),


                })
                .subscribe(({ voteType }) => {
                    this.initVoteTypeFormGroup(new VoteType(voteType));



                });
            }
            else{
                this.initVoteTypeFormGroup(new VoteType({id: 0}));

            }
        });
    }

    initVoteTypeFormGroup(voteType: VoteType) {
        this.baseFormService.initFormGroup<VoteType>(
            this.voteTypeFormGroup, 
            this.formGroup, 
            voteType, 
            this.voteTypeSaveBodyName,
            []
        );
        this.voteTypeFormGroup.mainDTOName = this.voteTypeSaveBodyName;
        this.loading = false;
        this.onVoteTypeFormGroupInitFinish.next();
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

}

@Component({
    selector: 'voting-theme-base-details',
    template:`
<ng-container *transloco="let t">
    <spider-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel">
        <panel-header></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <div class="col-12">
                        <spider-textbox [control]="control('name', votingThemeFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12">
                        <spider-textarea [control]="control('description', votingThemeFormGroup)"></spider-textarea>
                    </div>
                 <div class="col-12">
                    <spider-panel>
                        <panel-header [title]="t('VotingThemeItems')" icon="pi pi-list"></panel-header>
                        <panel-body [normalBottomPadding]="true">
                            @for (votingThemeItemFormGroup of getFormArrayGroups(votingThemeItemsFormArray); track votingThemeItemFormGroup; let index = $index; let last = $last) {
                                <index-card [index]="index" [last]="false" [crudMenu]="votingThemeItemsCrudMenu" (onMenuIconClick)="votingThemeItemsLastIndexClicked.index = $event">
                                    <form [formGroup]="votingThemeItemFormGroup" class="grid">
                    <div class="col-12">
                        <spider-textbox [control]="control('name', votingThemeItemFormGroup)"></spider-textbox>
                    </div>
                    <div class="col-12">
                        <spider-textarea [control]="control('description', votingThemeItemFormGroup)"></spider-textarea>
                    </div>
                                    </form>
                                </index-card>
                            }

                            <div class="panel-add-button">
                                <p-button (onClick)="addNewItemToVotingThemeItems(null)" [label]="t('AddNewVotingThemeItem')" icon="pi pi-plus"></p-button>
                            </div>

                        </panel-body>
                    </spider-panel>
                </div>       
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <p-button (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></p-button>
            @for (button of additionalButtons; track button.label) {
                <p-button (onClick)="button.onClick()" [label]="button.label" [icon]="button.icon"></p-button>
            }
            <spider-return-button></spider-return-button>
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
    modelId: number;
    loading: boolean = true;

    votingThemeSaveBodyName: string = nameof<VotingThemeSaveBody>('votingThemeDTO');

    votingThemeItemsModel: VotingThemeItem = new VotingThemeItem();
    votingThemeItemsSaveBodyName: string = nameof<VotingThemeItemSaveBody>('votingThemeItemDTO');
    votingThemeItemsTranslationKey: string = new VotingThemeItem().typeName;
    votingThemeItemsFormArray: SpiderFormArray<VotingThemeItem>;
    votingThemeItemsLastIndexClicked: LastMenuIconIndexClicked = new LastMenuIconIndexClicked();
    votingThemeItemsCrudMenu: MenuItem[] = [];







    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
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
                    votingTheme: this.apiService.getVotingTheme(this.modelId),
                    votingThemeItemsForVotingTheme: this.apiService.getOrderedVotingThemeItemsForVotingTheme(this.modelId),

                })
                .subscribe(({ votingTheme, votingThemeItemsForVotingTheme }) => {
                    this.initVotingThemeFormGroup(new VotingTheme(votingTheme));
                    this.initVotingThemeItemsFormArray(votingThemeItemsForVotingTheme);


                });
            }
            else{
                this.initVotingThemeFormGroup(new VotingTheme({id: 0}));
                this.initVotingThemeItemsFormArray([]);
            }
        });
    }

    initVotingThemeFormGroup(votingTheme: VotingTheme) {
        this.baseFormService.initFormGroup<VotingTheme>(
            this.votingThemeFormGroup, 
            this.formGroup, 
            votingTheme, 
            this.votingThemeSaveBodyName,
            []
        );
        this.votingThemeFormGroup.mainDTOName = this.votingThemeSaveBodyName;
        this.loading = false;
        this.onVotingThemeFormGroupInitFinish.next();
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

}
