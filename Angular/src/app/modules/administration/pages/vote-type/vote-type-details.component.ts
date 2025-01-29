import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { VoteType } from 'src/app/business/entities/business-entities.generated';
import { BaseFormCopy, SpiderFormGroup, SpiderMessageService, BaseFormService } from '@playerty/spider';

@Component({
    selector: 'vote-type-details',
    templateUrl: './vote-type-details.component.html',
    styles: [],
})
export class VoteTypeDetailsComponent extends BaseFormCopy implements OnInit {
    voteTypeFormGroup = new SpiderFormGroup<VoteType>({});

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SpiderMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute,
        protected override translocoService: TranslocoService,
        protected override baseFormService: BaseFormService,
        private apiService: ApiService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }

    override ngOnInit() {
        
    }

    override onBeforeSave = (): void => {
        
    }

}

