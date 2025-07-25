import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { Role, SpiderlyMessageService, BaseFormCopy, BaseFormService, SpiderlyFormGroup } from 'spiderly';

@Component({
    selector: 'role-details',
    templateUrl: './role-details.component.html',
    standalone: false,
    styles: [],
})
export class RoleDetailsComponent extends BaseFormCopy implements OnInit {
    roleFormGroup = new SpiderlyFormGroup<Role>({});

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SpiderlyMessageService, 
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router, 
        protected override route: ActivatedRoute, 
        protected override translocoService: TranslocoService,
        protected override baseFormService: BaseFormService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }
}

