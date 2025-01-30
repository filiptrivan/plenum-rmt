import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSecurityService, TableFilter, TableResponse, Namebook, Codebook, LazyLoadSelectedIdsResult, VerificationTokenRequest, AuthResult, ExternalProvider } from '@playerty/spider';
import { ConfigService } from '../config.service';
import { SendMessageSaveBody } from '../../entities/business-entities.generated';
import { Notification } from '../../entities/business-entities.generated';
import { NotificationSaveBody } from '../../entities/business-entities.generated';
import { UserExtendedMessage } from '../../entities/business-entities.generated';
import { UserExtendedSaveBody } from '../../entities/business-entities.generated';
import { UserExtendedVotingThemeItem } from '../../entities/business-entities.generated';
import { Message } from '../../entities/business-entities.generated';
import { MessageSaveBody } from '../../entities/business-entities.generated';
import { UserExtended } from '../../entities/business-entities.generated';
import { UserExtendedMessageSaveBody } from '../../entities/business-entities.generated';
import { UserExtendedVotingThemeItemSaveBody } from '../../entities/business-entities.generated';
import { UserNotification } from '../../entities/business-entities.generated';
import { UserNotificationSaveBody } from '../../entities/business-entities.generated';
import { VoteType } from '../../entities/business-entities.generated';
import { VoteTypeSaveBody } from '../../entities/business-entities.generated';
import { VotingTheme } from '../../entities/business-entities.generated';
import { VotingThemeSaveBody } from '../../entities/business-entities.generated';
import { VotingThemeItem } from '../../entities/business-entities.generated';
import { VotingThemeItemSaveBody } from '../../entities/business-entities.generated';

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

    getMessages = (correspondentId: number): Observable<UserExtendedMessage[]> => { 
        return this.http.get<UserExtendedMessage[]>(`${this.config.apiUrl}/Message/GetMessages?correspondentId=${correspondentId}`, this.config.httpSkipSpinnerOptions);
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

    getNotificationsForCurrentUser = (tableFilterDTO: TableFilter): Observable<TableResponse<Notification>> => { 
        return this.http.post<TableResponse<Notification>>(`${this.config.apiUrl}/Notification/GetNotificationsForCurrentUser`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    getUnreadNotificationCountForCurrentUser = (): Observable<number> => { 
        return this.http.get<number>(`${this.config.apiUrl}/Notification/GetUnreadNotificationCountForCurrentUser`, this.config.httpOptions);
    }

    getCurrentUserExtended = (): Observable<UserExtended> => { 
        return this.http.get<UserExtended>(`${this.config.apiUrl}/UserExtended/GetCurrentUserExtended`, this.config.httpSkipSpinnerOptions);
    }

    getCurrentUserPermissionCodes = (): Observable<string[]> => { 
        return this.http.get<string[]>(`${this.config.apiUrl}/UserExtended/GetCurrentUserPermissionCodes`, this.config.httpSkipSpinnerOptions);
    }

    getVotingThemeItemListForDisplay = (votingThemeId: number): Observable<VotingThemeItem[]> => { 
        return this.http.get<VotingThemeItem[]>(`${this.config.apiUrl}/VotingTheme/GetVotingThemeItemListForDisplay?votingThemeId=${votingThemeId}`, this.config.httpOptions);
    }

    vote = (votingThemeId: number, voteTypeId: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/VotingTheme/Vote?votingThemeId=${votingThemeId}&voteTypeId=${voteTypeId}`, this.config.httpSkipSpinnerOptions);
    }

    getMessageTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Message>> => { 
        return this.http.post<TableResponse<Message>>(`${this.config.apiUrl}/Message/GetMessageTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportMessageTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Message/ExportMessageTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getMessageList = (): Observable<Message[]> => { 
        return this.http.get<Message[]>(`${this.config.apiUrl}/Message/GetMessageList`, this.config.httpOptions);
    }

    getMessage = (id: number): Observable<Message> => { 
        return this.http.get<Message>(`${this.config.apiUrl}/Message/GetMessage?id=${id}`, this.config.httpOptions);
    }

    getMessageListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Message/GetMessageListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }

    getMessageListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Message/GetMessageListForDropdown`, this.config.httpSkipSpinnerOptions);
    }





    saveMessage = (saveBodyDTO: MessageSaveBody): Observable<MessageSaveBody> => { 
        return this.http.put<MessageSaveBody>(`${this.config.apiUrl}/Message/SaveMessage`, saveBodyDTO, this.config.httpOptions);
    }



    deleteMessage = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Message/DeleteMessage?id=${id}`, this.config.httpOptions);
    }


    getNotificationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Notification>> => { 
        return this.http.post<TableResponse<Notification>>(`${this.config.apiUrl}/Notification/GetNotificationTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportNotificationTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Notification/ExportNotificationTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getNotificationList = (): Observable<Notification[]> => { 
        return this.http.get<Notification[]>(`${this.config.apiUrl}/Notification/GetNotificationList`, this.config.httpOptions);
    }

    getNotification = (id: number): Observable<Notification> => { 
        return this.http.get<Notification>(`${this.config.apiUrl}/Notification/GetNotification?id=${id}`, this.config.httpOptions);
    }

    getNotificationListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Notification/GetNotificationListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }

    getNotificationListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Notification/GetNotificationListForDropdown`, this.config.httpSkipSpinnerOptions);
    }



    getRecipientsTableDataForNotification = (tableFilterDTO: TableFilter): Observable<TableResponse<UserExtended>> => { 
        return this.http.post<TableResponse<UserExtended>>(`${this.config.apiUrl}/Notification/GetRecipientsTableDataForNotification`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportRecipientsTableDataToExcelForNotification = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Notification/ExportRecipientsTableDataToExcelForNotification`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    lazyLoadSelectedRecipientsIdsForNotification = (tableFilterDTO: TableFilter): Observable<LazyLoadSelectedIdsResult> => { 
        return this.http.post<LazyLoadSelectedIdsResult>(`${this.config.apiUrl}/Notification/LazyLoadSelectedRecipientsIdsForNotification`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    saveNotification = (saveBodyDTO: NotificationSaveBody): Observable<NotificationSaveBody> => { 
        return this.http.put<NotificationSaveBody>(`${this.config.apiUrl}/Notification/SaveNotification`, saveBodyDTO, this.config.httpOptions);
    }



    deleteNotification = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Notification/DeleteNotification?id=${id}`, this.config.httpOptions);
    }


    getUserExtendedTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<UserExtended>> => { 
        return this.http.post<TableResponse<UserExtended>>(`${this.config.apiUrl}/UserExtended/GetUserExtendedTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportUserExtendedTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/UserExtended/ExportUserExtendedTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getUserExtendedList = (): Observable<UserExtended[]> => { 
        return this.http.get<UserExtended[]>(`${this.config.apiUrl}/UserExtended/GetUserExtendedList`, this.config.httpOptions);
    }

    getUserExtended = (id: number): Observable<UserExtended> => { 
        return this.http.get<UserExtended>(`${this.config.apiUrl}/UserExtended/GetUserExtended?id=${id}`, this.config.httpOptions);
    }

    getUserExtendedListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/UserExtended/GetUserExtendedListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }

    getUserExtendedListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/UserExtended/GetUserExtendedListForDropdown`, this.config.httpSkipSpinnerOptions);
    }





    saveUserExtended = (saveBodyDTO: UserExtendedSaveBody): Observable<UserExtendedSaveBody> => { 
        return this.http.put<UserExtendedSaveBody>(`${this.config.apiUrl}/UserExtended/SaveUserExtended`, saveBodyDTO, this.config.httpOptions);
    }



    deleteUserExtended = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/UserExtended/DeleteUserExtended?id=${id}`, this.config.httpOptions);
    }








    getVoteTypeTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<VoteType>> => { 
        return this.http.post<TableResponse<VoteType>>(`${this.config.apiUrl}/VoteType/GetVoteTypeTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportVoteTypeTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/VoteType/ExportVoteTypeTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getVoteTypeList = (): Observable<VoteType[]> => { 
        return this.http.get<VoteType[]>(`${this.config.apiUrl}/VoteType/GetVoteTypeList`, this.config.httpOptions);
    }

    getVoteType = (id: number): Observable<VoteType> => { 
        return this.http.get<VoteType>(`${this.config.apiUrl}/VoteType/GetVoteType?id=${id}`, this.config.httpOptions);
    }

    getVoteTypeListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/VoteType/GetVoteTypeListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }

    getVoteTypeListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/VoteType/GetVoteTypeListForDropdown`, this.config.httpSkipSpinnerOptions);
    }





    saveVoteType = (saveBodyDTO: VoteTypeSaveBody): Observable<VoteTypeSaveBody> => { 
        return this.http.put<VoteTypeSaveBody>(`${this.config.apiUrl}/VoteType/SaveVoteType`, saveBodyDTO, this.config.httpOptions);
    }



    deleteVoteType = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/VoteType/DeleteVoteType?id=${id}`, this.config.httpOptions);
    }


    getVotingThemeTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<VotingTheme>> => { 
        return this.http.post<TableResponse<VotingTheme>>(`${this.config.apiUrl}/VotingTheme/GetVotingThemeTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportVotingThemeTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/VotingTheme/ExportVotingThemeTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getVotingThemeList = (): Observable<VotingTheme[]> => { 
        return this.http.get<VotingTheme[]>(`${this.config.apiUrl}/VotingTheme/GetVotingThemeList`, this.config.httpOptions);
    }

    getVotingTheme = (id: number): Observable<VotingTheme> => { 
        return this.http.get<VotingTheme>(`${this.config.apiUrl}/VotingTheme/GetVotingTheme?id=${id}`, this.config.httpOptions);
    }

    getVotingThemeListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/VotingTheme/GetVotingThemeListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }

    getVotingThemeListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/VotingTheme/GetVotingThemeListForDropdown`, this.config.httpSkipSpinnerOptions);
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


    getVotingThemeItemTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<VotingThemeItem>> => { 
        return this.http.post<TableResponse<VotingThemeItem>>(`${this.config.apiUrl}/VotingThemeItem/GetVotingThemeItemTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportVotingThemeItemTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/VotingThemeItem/ExportVotingThemeItemTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getVotingThemeItemList = (): Observable<VotingThemeItem[]> => { 
        return this.http.get<VotingThemeItem[]>(`${this.config.apiUrl}/VotingThemeItem/GetVotingThemeItemList`, this.config.httpOptions);
    }

    getVotingThemeItem = (id: number): Observable<VotingThemeItem> => { 
        return this.http.get<VotingThemeItem>(`${this.config.apiUrl}/VotingThemeItem/GetVotingThemeItem?id=${id}`, this.config.httpOptions);
    }

    getVotingThemeItemListForAutocomplete = (limit: number, query: string): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/VotingThemeItem/GetVotingThemeItemListForAutocomplete?limit=${limit}&query=${query}`, this.config.httpSkipSpinnerOptions);
    }

    getVotingThemeItemListForDropdown = (): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/VotingThemeItem/GetVotingThemeItemListForDropdown`, this.config.httpSkipSpinnerOptions);
    }





    saveVotingThemeItem = (saveBodyDTO: VotingThemeItemSaveBody): Observable<VotingThemeItemSaveBody> => { 
        return this.http.put<VotingThemeItemSaveBody>(`${this.config.apiUrl}/VotingThemeItem/SaveVotingThemeItem`, saveBodyDTO, this.config.httpOptions);
    }



    deleteVotingThemeItem = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/VotingThemeItem/DeleteVotingThemeItem?id=${id}`, this.config.httpOptions);
    }


}
