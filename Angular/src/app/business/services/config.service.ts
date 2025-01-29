import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ConfigBaseService } from '@playerty/spider';

@Injectable({
  providedIn: 'root',
})
export class ConfigService extends ConfigBaseService
{
    override production: boolean = environment.production;
    override apiUrl: string = environment.apiUrl;
    override frontendUrl: string = environment.frontendUrl;
    override googleClientId: string = environment.googleClientId;
    override companyName: string = environment.companyName;

    /* URLs */
    administrationSlug: string = 'administration';

    constructor(
    ) {
        super();
    }
}