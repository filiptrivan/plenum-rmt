import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSecurityService, Filter, PaginatedResult, Namebook, Codebook, LazyLoadSelectedIdsResult, VerificationTokenRequest, AuthResult, ExternalProvider } from 'spiderly';
import { ConfigService } from '../config.service';
import { UserVotingThemeItem } from '../../entities/business-entities.generated';
import { NotificationSaveBody } from '../../entities/business-entities.generated';
import { SendMessageSaveBody } from '../../entities/business-entities.generated';
import { UserMessage } from '../../entities/business-entities.generated';
import { UserSaveBody } from '../../entities/business-entities.generated';
import { Notification } from '../../entities/business-entities.generated';
import { Message } from '../../entities/business-entities.generated';
import { MessageSaveBody } from '../../entities/business-entities.generated';
import { MessageMainUIForm } from '../../entities/business-entities.generated';
import { NotificationMainUIForm } from '../../entities/business-entities.generated';
import { User } from '../../entities/business-entities.generated';
import { UserMainUIForm } from '../../entities/business-entities.generated';
import { UserMessageSaveBody } from '../../entities/business-entities.generated';
import { UserMessageMainUIForm } from '../../entities/business-entities.generated';
import { UserNotification } from '../../entities/business-entities.generated';
import { UserNotificationSaveBody } from '../../entities/business-entities.generated';
import { UserNotificationMainUIForm } from '../../entities/business-entities.generated';
import { UserVotingThemeItemSaveBody } from '../../entities/business-entities.generated';
import { UserVotingThemeItemMainUIForm } from '../../entities/business-entities.generated';
import { VoteType } from '../../entities/business-entities.generated';
import { VoteTypeSaveBody } from '../../entities/business-entities.generated';
import { VoteTypeMainUIForm } from '../../entities/business-entities.generated';
import { VotingTheme } from '../../entities/business-entities.generated';
import { VotingThemeSaveBody } from '../../entities/business-entities.generated';
import { VotingThemeMainUIForm } from '../../entities/business-entities.generated';
import { VotingThemeItem } from '../../entities/business-entities.generated';
import { VotingThemeItemSaveBody } from '../../entities/business-entities.generated';
import { VotingThemeItemMainUIForm } from '../../entities/business-entities.generated';

@Injectable({
    providedIn: 'root'
})
export class ApiGeneratedService extends ApiSecurityService {

    constructor(
        protected override http: HttpClient,
        protected override config: ConfigService
    ) {
        super(http, config);
    }

    sendMessage = (saveBodyDTO: SendMessageSaveBody): Observable<any> => { 
        return this.http.put(`${this.config.apiUrl}/Message/SendMessage`, saveBodyDTO, this.config.httpSkipSpinnerOptions);
    }

    getMessages = (correspondentId: number): Observable<UserMessage[]> => { 
        return this.http.get<UserMessage[]>(`${this.config.apiUrl}/Message/GetMessages?correspondentId=${correspondentId}`, this.config.httpSkipSpinnerOptions);
    }

    sendNotificationEmail = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/SendNotificationEmail?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    deleteNotificationForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Notification/DeleteNotificationForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    markNotificationAsReadForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/MarkNotificationAsReadForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    markNotificationAsUnreadForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/MarkNotificationAsUnreadForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    getNotificationsForCurrentUser = (tableFilterDTO: Filter): Observable<PaginatedResult<Notification>> => { 
        return this.http.post<PaginatedResult<Notification>>(`${this.config.apiUrl}/Notification/GetNotificationsForCurrentUser`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    getCurrentUser = (): Observable<User> => { 
        return this.http.get<User>(`${this.config.apiUrl}/User/GetCurrentUser`, this.config.httpSkipSpinnerOptions);
    }

    getVotingThemeItemListForDisplay = (votingThemeId: number): Observable<VotingThemeItem[]> => { 
        return this.http.get<VotingThemeItem[]>(`${this.config.apiUrl}/VotingTheme/GetVotingThemeItemListForDisplay?votingThemeId=${votingThemeId}`, this.config.httpOptions);
    }

    vote = (votingThemeId: number, voteTypeId: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/VotingTheme/Vote?votingThemeId=${votingThemeId}&voteTypeId=${voteTypeId}`, this.config.httpSkipSpinnerOptions);
    }



    getPaginatedVoteTypeList = (filterDTO: Filter): Observable<PaginatedResult<VoteType>> => { 
        return this.http.post<PaginatedResult<VoteType>>(`${this.config.apiUrl}/VoteType/GetPaginatedVoteTypeList`, filterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportVoteTypeListToExcel = (filterDTO: Filter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/VoteType/ExportVoteTypeListToExcel`, filterDTO, { observe: 'response', responseType: 'blob' });
    }

    getVoteTypeList = (): Observable<VoteType[]> => { 
        return this.http.get<VoteType[]>(`${this.config.apiUrl}/VoteType/GetVoteTypeList`, this.config.httpOptions);
    }

    getVoteTypeMainUIFormDTO = (id: number): Observable<VoteTypeMainUIForm> => { 
        return this.http.get<VoteTypeMainUIForm>(`${this.config.apiUrl}/VoteType/GetVoteTypeMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getVoteType = (id: number): Observable<VoteType> => { 
        return this.http.get<VoteType>(`${this.config.apiUrl}/VoteType/GetVoteType?id=${id}`, this.config.httpOptions);
    }









    saveVoteType = (saveBodyDTO: VoteTypeSaveBody): Observable<VoteTypeSaveBody> => { 
        return this.http.put<VoteTypeSaveBody>(`${this.config.apiUrl}/VoteType/SaveVoteType`, saveBodyDTO, this.config.httpOptions);
    }



    deleteVoteType = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/VoteType/DeleteVoteType?id=${id}`, this.config.httpOptions);
    }




    getPaginatedUserList = (filterDTO: Filter): Observable<PaginatedResult<User>> => { 
        return this.http.post<PaginatedResult<User>>(`${this.config.apiUrl}/User/GetPaginatedUserList`, filterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportUserListToExcel = (filterDTO: Filter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/User/ExportUserListToExcel`, filterDTO, { observe: 'response', responseType: 'blob' });
    }

    getUserList = (): Observable<User[]> => { 
        return this.http.get<User[]>(`${this.config.apiUrl}/User/GetUserList`, this.config.httpOptions);
    }

    getUserMainUIFormDTO = (id: number): Observable<UserMainUIForm> => { 
        return this.http.get<UserMainUIForm>(`${this.config.apiUrl}/User/GetUserMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getUser = (id: number): Observable<User> => { 
        return this.http.get<User>(`${this.config.apiUrl}/User/GetUser?id=${id}`, this.config.httpOptions);
    }









    saveUser = (saveBodyDTO: UserSaveBody): Observable<UserSaveBody> => { 
        return this.http.put<UserSaveBody>(`${this.config.apiUrl}/User/SaveUser`, saveBodyDTO, this.config.httpOptions);
    }



    deleteUser = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/User/DeleteUser?id=${id}`, this.config.httpOptions);
    }




    getPaginatedVotingThemeList = (filterDTO: Filter): Observable<PaginatedResult<VotingTheme>> => { 
        return this.http.post<PaginatedResult<VotingTheme>>(`${this.config.apiUrl}/VotingTheme/GetPaginatedVotingThemeList`, filterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportVotingThemeListToExcel = (filterDTO: Filter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/VotingTheme/ExportVotingThemeListToExcel`, filterDTO, { observe: 'response', responseType: 'blob' });
    }

    getVotingThemeList = (): Observable<VotingTheme[]> => { 
        return this.http.get<VotingTheme[]>(`${this.config.apiUrl}/VotingTheme/GetVotingThemeList`, this.config.httpOptions);
    }

    getVotingThemeMainUIFormDTO = (id: number): Observable<VotingThemeMainUIForm> => { 
        return this.http.get<VotingThemeMainUIForm>(`${this.config.apiUrl}/VotingTheme/GetVotingThemeMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getVotingTheme = (id: number): Observable<VotingTheme> => { 
        return this.http.get<VotingTheme>(`${this.config.apiUrl}/VotingTheme/GetVotingTheme?id=${id}`, this.config.httpOptions);
    }





    getOrderedVotingThemeItemsForVotingTheme = (id: number): Observable<VotingThemeItem[]> => { 
        return this.http.get<VotingThemeItem[]>(`${this.config.apiUrl}/VotingTheme/GetOrderedVotingThemeItemsForVotingTheme?id=${id}`, this.config.httpOptions);
    }



    saveVotingTheme = (saveBodyDTO: VotingThemeSaveBody): Observable<VotingThemeSaveBody> => { 
        return this.http.put<VotingThemeSaveBody>(`${this.config.apiUrl}/VotingTheme/SaveVotingTheme`, saveBodyDTO, this.config.httpOptions);
    }



    deleteVotingTheme = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/VotingTheme/DeleteVotingTheme?id=${id}`, this.config.httpOptions);
    }


    getPaginatedNotificationList = (filterDTO: Filter): Observable<PaginatedResult<Notification>> => { 
        return this.http.post<PaginatedResult<Notification>>(`${this.config.apiUrl}/Notification/GetPaginatedNotificationList`, filterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportNotificationListToExcel = (filterDTO: Filter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Notification/ExportNotificationListToExcel`, filterDTO, { observe: 'response', responseType: 'blob' });
    }

    getNotificationList = (): Observable<Notification[]> => { 
        return this.http.get<Notification[]>(`${this.config.apiUrl}/Notification/GetNotificationList`, this.config.httpOptions);
    }

    getNotificationMainUIFormDTO = (id: number): Observable<NotificationMainUIForm> => { 
        return this.http.get<NotificationMainUIForm>(`${this.config.apiUrl}/Notification/GetNotificationMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getNotification = (id: number): Observable<Notification> => { 
        return this.http.get<Notification>(`${this.config.apiUrl}/Notification/GetNotification?id=${id}`, this.config.httpOptions);
    }







    getPaginatedRecipientsListForNotification = (filterDTO: Filter): Observable<PaginatedResult<User>> => { 
        return this.http.post<PaginatedResult<User>>(`${this.config.apiUrl}/Notification/GetPaginatedRecipientsListForNotification`, filterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportRecipientsListToExcelForNotification = (filterDTO: Filter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Notification/ExportRecipientsListToExcelForNotification`, filterDTO, { observe: 'response', responseType: 'blob' });
    }

    lazyLoadSelectedRecipientsIdsForNotification = (filterDTO: Filter): Observable<LazyLoadSelectedIdsResult> => { 
        return this.http.post<LazyLoadSelectedIdsResult>(`${this.config.apiUrl}/Notification/LazyLoadSelectedRecipientsIdsForNotification`, filterDTO, this.config.httpSkipSpinnerOptions);
    }

    saveNotification = (saveBodyDTO: NotificationSaveBody): Observable<NotificationSaveBody> => { 
        return this.http.put<NotificationSaveBody>(`${this.config.apiUrl}/Notification/SaveNotification`, saveBodyDTO, this.config.httpOptions);
    }



    deleteNotification = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Notification/DeleteNotification?id=${id}`, this.config.httpOptions);
    }


}
