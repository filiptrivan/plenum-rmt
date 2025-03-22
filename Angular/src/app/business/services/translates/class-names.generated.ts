import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslateClassNamesGeneratedService {

    constructor(
        private translocoService: TranslocoService
    ) {
    }

    translate = (name: string): string => {
        switch(name) 
        {
            case 'AuthResult':
                return this.translocoService.translate('AuthResult');
            case 'BusinessObjectCodebook':
                return this.translocoService.translate('BusinessObjectCodebook');
            case 'BusinessObject':
                return this.translocoService.translate('BusinessObject');
            case 'BusinessObjectNamebook':
                return this.translocoService.translate('BusinessObjectNamebook');
            case 'Codebook':
                return this.translocoService.translate('Codebook');
            case 'ExcelReportOptions':
                return this.translocoService.translate('ExcelReportOptions');
            case 'ExternalProvider':
                return this.translocoService.translate('ExternalProvider');
            case 'JwtAuthResult':
                return this.translocoService.translate('JwtAuthResult');
            case 'LazyLoadSelectedIdsResult':
                return this.translocoService.translate('LazyLoadSelectedIdsResult');
            case 'Login':
                return this.translocoService.translate('Login');
            case 'LoginVerificationToken':
                return this.translocoService.translate('LoginVerificationToken');
            case 'Message':
                return this.translocoService.translate('Message');
            case 'MessageMainUIForm':
                return this.translocoService.translate('MessageMainUIForm');
            case 'MessageSaveBody':
                return this.translocoService.translate('MessageSaveBody');
            case 'Namebook':
                return this.translocoService.translate('Namebook');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'NotificationMainUIForm':
                return this.translocoService.translate('NotificationMainUIForm');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'PaginationResult':
                return this.translocoService.translate('PaginationResult');
            case 'Permission':
                return this.translocoService.translate('Permission');
            case 'PermissionMainUIForm':
                return this.translocoService.translate('PermissionMainUIForm');
            case 'PermissionSaveBody':
                return this.translocoService.translate('PermissionSaveBody');
            case 'ReadonlyObject':
                return this.translocoService.translate('ReadonlyObject');
            case 'RefreshToken':
                return this.translocoService.translate('RefreshToken');
            case 'RefreshTokenRequest':
                return this.translocoService.translate('RefreshTokenRequest');
            case 'Registration':
                return this.translocoService.translate('Registration');
            case 'RegistrationVerificationResult':
                return this.translocoService.translate('RegistrationVerificationResult');
            case 'RegistrationVerificationToken':
                return this.translocoService.translate('RegistrationVerificationToken');
            case 'Role':
                return this.translocoService.translate('Role');
            case 'RoleMainUIForm':
                return this.translocoService.translate('RoleMainUIForm');
            case 'RolePermission':
                return this.translocoService.translate('RolePermission');
            case 'RolePermissionMainUIForm':
                return this.translocoService.translate('RolePermissionMainUIForm');
            case 'RolePermissionSaveBody':
                return this.translocoService.translate('RolePermissionSaveBody');
            case 'RoleSaveBody':
                return this.translocoService.translate('RoleSaveBody');
            case 'SendMessageSaveBody':
                return this.translocoService.translate('SendMessageSaveBody');
            case 'SimpleSaveResult':
                return this.translocoService.translate('SimpleSaveResult');
            case 'TableFilterContext':
                return this.translocoService.translate('TableFilterContext');
            case 'TableFilter':
                return this.translocoService.translate('TableFilter');
            case 'TableFilterSortMeta':
                return this.translocoService.translate('TableFilterSortMeta');
            case 'TableResponse':
                return this.translocoService.translate('TableResponse');
            case 'User':
                return this.translocoService.translate('User');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'UserExtendedMainUIForm':
                return this.translocoService.translate('UserExtendedMainUIForm');
            case 'UserExtendedMessage':
                return this.translocoService.translate('UserExtendedMessage');
            case 'UserExtendedMessageMainUIForm':
                return this.translocoService.translate('UserExtendedMessageMainUIForm');
            case 'UserExtendedMessageSaveBody':
                return this.translocoService.translate('UserExtendedMessageSaveBody');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'UserExtendedVotingThemeItem':
                return this.translocoService.translate('UserExtendedVotingThemeItem');
            case 'UserExtendedVotingThemeItemMainUIForm':
                return this.translocoService.translate('UserExtendedVotingThemeItemMainUIForm');
            case 'UserExtendedVotingThemeItemSaveBody':
                return this.translocoService.translate('UserExtendedVotingThemeItemSaveBody');
            case 'UserNotification':
                return this.translocoService.translate('UserNotification');
            case 'UserNotificationMainUIForm':
                return this.translocoService.translate('UserNotificationMainUIForm');
            case 'UserNotificationSaveBody':
                return this.translocoService.translate('UserNotificationSaveBody');
            case 'UserRole':
                return this.translocoService.translate('UserRole');
            case 'UserRoleMainUIForm':
                return this.translocoService.translate('UserRoleMainUIForm');
            case 'UserRoleSaveBody':
                return this.translocoService.translate('UserRoleSaveBody');
            case 'VerificationTokenRequest':
                return this.translocoService.translate('VerificationTokenRequest');
            case 'VoteType':
                return this.translocoService.translate('VoteType');
            case 'VoteTypeMainUIForm':
                return this.translocoService.translate('VoteTypeMainUIForm');
            case 'VoteTypeSaveBody':
                return this.translocoService.translate('VoteTypeSaveBody');
            case 'VotingTheme':
                return this.translocoService.translate('VotingTheme');
            case 'VotingThemeItem':
                return this.translocoService.translate('VotingThemeItem');
            case 'VotingThemeItemMainUIForm':
                return this.translocoService.translate('VotingThemeItemMainUIForm');
            case 'VotingThemeItemSaveBody':
                return this.translocoService.translate('VotingThemeItemSaveBody');
            case 'VotingThemeMainUIForm':
                return this.translocoService.translate('VotingThemeMainUIForm');
            case 'VotingThemeSaveBody':
                return this.translocoService.translate('VotingThemeSaveBody');
            default:
                return null;
        }
    }
}

