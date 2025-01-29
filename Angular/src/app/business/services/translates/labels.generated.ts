import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslateLabelsGeneratedService {

    constructor(
        private translocoService: TranslocoService
    ) {
    }

    translate = (name: string): string => {
        switch(name) 
        {
            case 'user':
                return this.translocoService.translate('User');
            case 'email':
                return this.translocoService.translate('Email');
            case 'accessToken':
                return this.translocoService.translate('AccessToken');
            case 'refreshToken':
                return this.translocoService.translate('RefreshToken');
            case 'code':
                return this.translocoService.translate('Code');
            case 'name':
                return this.translocoService.translate('Name');
            case 'id':
                return this.translocoService.translate('Id');
            case 'version':
                return this.translocoService.translate('Version');
            case 'createdAt':
                return this.translocoService.translate('CreatedAt');
            case 'modifiedAt':
                return this.translocoService.translate('ModifiedAt');
            case 'displayName':
                return this.translocoService.translate('DisplayName');
            case 'isLeaf':
                return this.translocoService.translate('IsLeaf');
            case 'additionalColumnHeaders':
                return this.translocoService.translate('AdditionalColumnHeaders');
            case 'additionalDataStartColumn':
                return this.translocoService.translate('AdditionalDataStartColumn');
            case 'dataSheetName':
                return this.translocoService.translate('DataSheetName');
            case 'dataSheetName2':
                return this.translocoService.translate('DataSheetName2');
            case 'dataStartRow':
                return this.translocoService.translate('DataStartRow');
            case 'dataStartColumn':
                return this.translocoService.translate('DataStartColumn');
            case 'createNewDataRows':
                return this.translocoService.translate('CreateNewDataRows');
            case 'idToken':
                return this.translocoService.translate('IdToken');
            case 'browser':
                return this.translocoService.translate('Browser');
            case 'userEmail':
                return this.translocoService.translate('UserEmail');
            case 'token':
                return this.translocoService.translate('Token');
            case 'selectedIds':
                return this.translocoService.translate('SelectedIds');
            case 'totalRecordsSelected':
                return this.translocoService.translate('TotalRecordsSelected');
            case 'expireAt':
                return this.translocoService.translate('ExpireAt');
            case 'text':
                return this.translocoService.translate('Text');
            case 'sender':
                return this.translocoService.translate('Sender');
            case 'messageDTO':
                return this.translocoService.translate('MessageDTO');
            case 'isMarkedAsRead':
                return this.translocoService.translate('IsMarkedAsRead');
            case 'title':
                return this.translocoService.translate('Title');
            case 'description':
                return this.translocoService.translate('Description');
            case 'emailBody':
                return this.translocoService.translate('EmailBody');
            case 'notificationDTO':
                return this.translocoService.translate('NotificationDTO');
            case 'selectedRecipientsIds':
                return this.translocoService.translate('SelectedRecipientsIds');
            case 'unselectedRecipientsIds':
                return this.translocoService.translate('UnselectedRecipientsIds');
            case 'areAllRecipientsSelected':
                return this.translocoService.translate('AreAllRecipientsSelected');
            case 'recipientsTableFilter':
                return this.translocoService.translate('RecipientsTableFilter');
            case 'totalRecords':
                return this.translocoService.translate('TotalRecords');
            case 'query':
                return this.translocoService.translate('Query');
            case 'nameLatin':
                return this.translocoService.translate('NameLatin');
            case 'descriptionLatin':
                return this.translocoService.translate('DescriptionLatin');
            case 'permissionDTO':
                return this.translocoService.translate('PermissionDTO');
            case 'ipAddress':
                return this.translocoService.translate('IpAddress');
            case 'tokenString':
                return this.translocoService.translate('TokenString');
            case 'status':
                return this.translocoService.translate('Status');
            case 'message':
                return this.translocoService.translate('Message');
            case 'role':
                return this.translocoService.translate('Role');
            case 'permission':
                return this.translocoService.translate('Permission');
            case 'rolePermissionDTO':
                return this.translocoService.translate('RolePermissionDTO');
            case 'selectedPermissionIds':
                return this.translocoService.translate('SelectedPermissionIds');
            case 'selectedUserIds':
                return this.translocoService.translate('SelectedUserIds');
            case 'roleDTO':
                return this.translocoService.translate('RoleDTO');
            case 'value':
                return this.translocoService.translate('Value');
            case 'matchMode':
                return this.translocoService.translate('MatchMode');
            case 'operator':
                return this.translocoService.translate('Operator');
            case 'filters':
                return this.translocoService.translate('Filters');
            case 'first':
                return this.translocoService.translate('First');
            case 'rows':
                return this.translocoService.translate('Rows');
            case 'sortField':
                return this.translocoService.translate('SortField');
            case 'sortOrder':
                return this.translocoService.translate('SortOrder');
            case 'multiSortMeta':
                return this.translocoService.translate('MultiSortMeta');
            case 'additionalFilterIdInt':
                return this.translocoService.translate('AdditionalFilterIdInt');
            case 'additionalFilterIdLong':
                return this.translocoService.translate('AdditionalFilterIdLong');
            case 'field':
                return this.translocoService.translate('Field');
            case 'order':
                return this.translocoService.translate('Order');
            case 'data':
                return this.translocoService.translate('Data');
            case 'hasLoggedInWithExternalProvider':
                return this.translocoService.translate('HasLoggedInWithExternalProvider');
            case 'isDisabled':
                return this.translocoService.translate('IsDisabled');
            case 'userExtendedMessageDTO':
                return this.translocoService.translate('UserExtendedMessageDTO');
            case 'selectedRolesIds':
                return this.translocoService.translate('SelectedRolesIds');
            case 'userExtendedDTO':
                return this.translocoService.translate('UserExtendedDTO');
            case 'votingThemeItem':
                return this.translocoService.translate('VotingThemeItem');
            case 'voteType':
                return this.translocoService.translate('VoteType');
            case 'userExtendedVotingThemeItemDTO':
                return this.translocoService.translate('UserExtendedVotingThemeItemDTO');
            case 'notification':
                return this.translocoService.translate('Notification');
            case 'userNotificationDTO':
                return this.translocoService.translate('UserNotificationDTO');
            case 'userRoleDTO':
                return this.translocoService.translate('UserRoleDTO');
            case 'verificationCode':
                return this.translocoService.translate('VerificationCode');
            case 'icon':
                return this.translocoService.translate('Icon');
            case 'voteTypeDTO':
                return this.translocoService.translate('VoteTypeDTO');
            case 'votingThemeItemsDTOList':
                return this.translocoService.translate('VotingThemeItemsDTOList');
            case 'orderNumber':
                return this.translocoService.translate('OrderNumber');
            case 'votingTheme':
                return this.translocoService.translate('VotingTheme');
            case 'usersVotedDTOList':
                return this.translocoService.translate('UsersVotedDTOList');
            case 'votingThemeItemDTO':
                return this.translocoService.translate('VotingThemeItemDTO');
            case 'votingThemeDTO':
                return this.translocoService.translate('VotingThemeDTO');
            case 'votingThemeItemsDTO':
                return this.translocoService.translate('VotingThemeItemsDTO');
            default:
                return null;
        }
    }
}

