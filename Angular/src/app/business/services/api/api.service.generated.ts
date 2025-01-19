import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiSecurityService } from './api.service.security';
import { Namebook } from 'src/app/core/entities/namebook';
import { Codebook } from 'src/app/core/entities/codebook';
import { SimpleSaveResult } from 'src/app/core/entities/simple-save-result';
import { TableFilter } from 'src/app/core/entities/table-filter';
import { TableResponse } from 'src/app/core/entities/table-response';
import { LazyLoadSelectedIdsResult } from 'src/app/core/entities/lazy-load-selected-ids-result';
import { Notification } from '../../entities/business-entities.generated';
import { NotificationSaveBody } from '../../entities/business-entities.generated';
import { UserExtendedSaveBody } from '../../entities/business-entities.generated';
import { Message } from '../../entities/business-entities.generated';
import { MessageSaveBody } from '../../entities/business-entities.generated';
import { UserExtended } from '../../entities/business-entities.generated';
import { UserExtendedMessage } from '../../entities/business-entities.generated';
import { UserExtendedMessageSaveBody } from '../../entities/business-entities.generated';
import { UserExtendedVotingThemeItem } from '../../entities/business-entities.generated';
import { UserExtendedVotingThemeItemSaveBody } from '../../entities/business-entities.generated';
import { UserNotification } from '../../entities/business-entities.generated';
import { UserNotificationSaveBody } from '../../entities/business-entities.generated';
import { VoteType } from '../../entities/business-entities.generated';
import { VoteTypeSaveBody } from '../../entities/business-entities.generated';
import { VotingTheme } from '../../entities/business-entities.generated';
import { VotingThemeSaveBody } from '../../entities/business-entities.generated';
import { VotingThemeItem } from '../../entities/business-entities.generated';
import { VotingThemeItemSaveBody } from '../../entities/business-entities.generated';
import { RefreshTokenRequest } from '../../entities/security-entities.generated';
import { RefreshToken } from '../../entities/security-entities.generated';
import { Registration } from '../../entities/security-entities.generated';
import { RoleSaveBody } from '../../entities/security-entities.generated';
import { RegistrationVerificationResult } from '../../entities/security-entities.generated';
import { RegistrationVerificationToken } from '../../entities/security-entities.generated';
import { AuthResult } from '../../entities/security-entities.generated';
import { Login } from '../../entities/security-entities.generated';
import { JwtAuthResult } from '../../entities/security-entities.generated';
import { ExternalProvider } from '../../entities/security-entities.generated';
import { VerificationTokenRequest } from '../../entities/security-entities.generated';
import { LoginVerificationToken } from '../../entities/security-entities.generated';
import { Permission } from '../../entities/security-entities.generated';
import { PermissionSaveBody } from '../../entities/security-entities.generated';
import { Role } from '../../entities/security-entities.generated';
import { RolePermission } from '../../entities/security-entities.generated';
import { RolePermissionSaveBody } from '../../entities/security-entities.generated';
import { UserRoleSaveBody } from '../../entities/security-entities.generated';

@Injectable()
export class ApiGeneratedService extends ApiSecurityService {

    constructor(protected override http: HttpClient) {
        super(http);
    }

    sendNotificationEmail = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${environment.apiUrl}/Notification/SendNotificationEmail?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, environment.httpOptions);
    }

    deleteNotificationForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.delete(`${environment.apiUrl}/Notification/DeleteNotificationForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, environment.httpOptions);
    }

    markNotificationAsReadForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${environment.apiUrl}/Notification/MarkNotificationAsReadForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, environment.httpOptions);
    }

    markNotificationAsUnreadForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${environment.apiUrl}/Notification/MarkNotificationAsUnreadForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, environment.httpOptions);
    }

    register = (request: VerificationTokenRequest): Observable<AuthResult> => { 
        return this.http.post<AuthResult>(`${environment.apiUrl}/Security/Register`, request, environment.httpOptions);
    }

    login = (request: VerificationTokenRequest): Observable<AuthResult> => { 
        return this.http.post<AuthResult>(`${environment.apiUrl}/Security/Login`, request, environment.httpOptions);
    }

    loginExternal = (externalProviderDTO: ExternalProvider): Observable<AuthResult> => { 
        return this.http.post<AuthResult>(`${environment.apiUrl}/Security/LoginExternal`, externalProviderDTO, environment.httpOptions);
    }

    getCurrentUser = (): Observable<UserExtended> => { 
        return this.http.get<UserExtended>(`${environment.apiUrl}/UserExtended/GetCurrentUser`, environment.httpSkipSpinnerOptions);
    }

    getCurrentUserPermissionCodes = (): Observable<string[]> => { 
        return this.http.get<string[]>(`${environment.apiUrl}/UserExtended/GetCurrentUserPermissionCodes`, environment.httpSkipSpinnerOptions);
    }

    getUserExtendedTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<UserExtended>> => { 
        return this.http.post<TableResponse<UserExtended>>(`${environment.apiUrl}/UserExtended/GetUserExtendedTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportUserExtendedTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${environment.apiUrl}/UserExtended/ExportUserExtendedTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getUserExtendedList = (): Observable<UserExtended[]> => { 
        return this.http.get<UserExtended[]>(`${environment.apiUrl}/UserExtended/GetUserExtendedList`, environment.httpOptions);
    }

    getUserExtended = (id: number): Observable<UserExtended> => { 
        return this.http.get<UserExtended>(`${environment.apiUrl}/UserExtended/GetUserExtended?id=${id}`, environment.httpOptions);
    }

    getUserExtendedListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/UserExtended/GetUserExtendedListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    getUserExtendedListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/UserExtended/GetUserExtendedListForDropdown`, environment.httpSkipSpinnerOptions);
    }





    saveUserExtended = (saveBodyDTO: UserExtendedSaveBody): Observable<UserExtendedSaveBody> => { 
        return this.http.put<UserExtendedSaveBody>(`${environment.apiUrl}/UserExtended/SaveUserExtended`, saveBodyDTO, environment.httpOptions);
    }



    deleteUserExtended = (id: number): Observable<any> => { 
        return this.http.delete(`${environment.apiUrl}/UserExtended/DeleteUserExtended?id=${id}`, environment.httpOptions);
    }


    getNotificationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Notification>> => { 
        return this.http.post<TableResponse<Notification>>(`${environment.apiUrl}/Notification/GetNotificationTableData`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportNotificationTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${environment.apiUrl}/Notification/ExportNotificationTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getNotificationList = (): Observable<Notification[]> => { 
        return this.http.get<Notification[]>(`${environment.apiUrl}/Notification/GetNotificationList`, environment.httpOptions);
    }

    getNotification = (id: number): Observable<Notification> => { 
        return this.http.get<Notification>(`${environment.apiUrl}/Notification/GetNotification?id=${id}`, environment.httpOptions);
    }

    getNotificationListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Notification/GetNotificationListForAutocomplete?limit=${limit}&query=${query}`, environment.httpSkipSpinnerOptions);
    }

    getNotificationListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${environment.apiUrl}/Notification/GetNotificationListForDropdown`, environment.httpSkipSpinnerOptions);
    }



    getRecipientsTableDataForNotification = (tableFilterDTO: TableFilter): Observable<TableResponse<UserExtended>> => { 
        return this.http.post<TableResponse<UserExtended>>(`${environment.apiUrl}/Notification/GetRecipientsTableDataForNotification`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    exportRecipientsTableDataToExcelForNotification = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${environment.apiUrl}/Notification/ExportRecipientsTableDataToExcelForNotification`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    lazyLoadSelectedRecipientsIdsForNotification = (tableFilterDTO: TableFilter): Observable<LazyLoadSelectedIdsResult> => { 
        return this.http.post<LazyLoadSelectedIdsResult>(`${environment.apiUrl}/Notification/LazyLoadSelectedRecipientsIdsForNotification`, tableFilterDTO, environment.httpSkipSpinnerOptions);
    }

    saveNotification = (saveBodyDTO: NotificationSaveBody): Observable<NotificationSaveBody> => { 
        return this.http.put<NotificationSaveBody>(`${environment.apiUrl}/Notification/SaveNotification`, saveBodyDTO, environment.httpOptions);
    }



    deleteNotification = (id: number): Observable<any> => { 
        return this.http.delete(`${environment.apiUrl}/Notification/DeleteNotification?id=${id}`, environment.httpOptions);
    }


}
