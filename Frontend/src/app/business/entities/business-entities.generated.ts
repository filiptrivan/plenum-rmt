import { BaseEntity, Filter, FilterRule, FilterSortMeta, MimeTypes, Namebook } from 'spiderly';



export class Message extends BaseEntity
{
    text?: string;
	senderDisplayName?: string;
	senderId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        text,
		senderDisplayName,
		senderId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        text?: string;
		senderDisplayName?: string;
		senderId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Message'); 

        this.text = text;
		this.senderDisplayName = senderDisplayName;
		this.senderId = senderId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class MessageSaveBody extends BaseEntity
{
    messageDTO?: Message;

    constructor(
    {
        messageDTO
    }:{
        messageDTO?: Message;     
    } = {}
    ) {
        super('MessageSaveBody'); 

        this.messageDTO = messageDTO;
    }
}


export class MessageMainUIForm extends BaseEntity
{
    messageDTO?: Message;

    constructor(
    {
        messageDTO
    }:{
        messageDTO?: Message;     
    } = {}
    ) {
        super('MessageMainUIForm'); 

        this.messageDTO = messageDTO;
    }
}


export class Notification extends BaseEntity
{
    title?: string;
	description?: string;
	emailBody?: string;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;
	isMarkedAsRead?: boolean;

    constructor(
    {
        title,
		description,
		emailBody,
		version,
		id,
		createdAt,
		modifiedAt,
		isMarkedAsRead
    }:{
        title?: string;
		description?: string;
		emailBody?: string;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('Notification'); 

        this.title = title;
		this.description = description;
		this.emailBody = emailBody;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.isMarkedAsRead = isMarkedAsRead;
    }
}


export class NotificationSaveBody extends BaseEntity
{
    notificationDTO?: Notification;
	selectedRecipientsIds?: number[];
	unselectedRecipientsIds?: number[];
	areAllRecipientsSelected?: boolean;
	recipientsTableFilter?: Filter;
	isMarkedAsRead?: boolean;

    constructor(
    {
        notificationDTO,
		selectedRecipientsIds,
		unselectedRecipientsIds,
		areAllRecipientsSelected,
		recipientsTableFilter,
		isMarkedAsRead
    }:{
        notificationDTO?: Notification;
		selectedRecipientsIds?: number[];
		unselectedRecipientsIds?: number[];
		areAllRecipientsSelected?: boolean;
		recipientsTableFilter?: Filter;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('NotificationSaveBody'); 

        this.notificationDTO = notificationDTO;
		this.selectedRecipientsIds = selectedRecipientsIds;
		this.unselectedRecipientsIds = unselectedRecipientsIds;
		this.areAllRecipientsSelected = areAllRecipientsSelected;
		this.recipientsTableFilter = recipientsTableFilter;
		this.isMarkedAsRead = isMarkedAsRead;
    }
}


export class NotificationMainUIForm extends BaseEntity
{
    notificationDTO?: Notification;

    constructor(
    {
        notificationDTO
    }:{
        notificationDTO?: Notification;     
    } = {}
    ) {
        super('NotificationMainUIForm'); 

        this.notificationDTO = notificationDTO;
    }
}


export class SendMessageSaveBody extends BaseEntity
{
    senderId?: number;
	recipientId?: number;
	messageText?: string;

    constructor(
    {
        senderId,
		recipientId,
		messageText
    }:{
        senderId?: number;
		recipientId?: number;
		messageText?: string;     
    } = {}
    ) {
        super('SendMessageSaveBody'); 

        this.senderId = senderId;
		this.recipientId = recipientId;
		this.messageText = messageText;
    }
}


export class User extends BaseEntity
{
    email?: string;
	hasLoggedInWithExternalProvider?: boolean;
	isDisabled?: boolean;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        email,
		hasLoggedInWithExternalProvider,
		isDisabled,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        email?: string;
		hasLoggedInWithExternalProvider?: boolean;
		isDisabled?: boolean;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('User'); 

        this.email = email;
		this.hasLoggedInWithExternalProvider = hasLoggedInWithExternalProvider;
		this.isDisabled = isDisabled;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class UserSaveBody extends BaseEntity
{
    userDTO?: User;
	selectedRolesIds?: number[];

    constructor(
    {
        userDTO,
		selectedRolesIds
    }:{
        userDTO?: User;
		selectedRolesIds?: number[];     
    } = {}
    ) {
        super('UserSaveBody'); 

        this.userDTO = userDTO;
		this.selectedRolesIds = selectedRolesIds;
    }
}


export class UserMainUIForm extends BaseEntity
{
    userDTO?: User;

    constructor(
    {
        userDTO
    }:{
        userDTO?: User;     
    } = {}
    ) {
        super('UserMainUIForm'); 

        this.userDTO = userDTO;
    }
}


export class UserMessage extends BaseEntity
{
    recipientDisplayName?: string;
	recipientId?: number;
	messageDisplayName?: string;
	messageId?: number;
	senderId?: number;
	senderDisplayName?: string;

    constructor(
    {
        recipientDisplayName,
		recipientId,
		messageDisplayName,
		messageId,
		senderId,
		senderDisplayName
    }:{
        recipientDisplayName?: string;
		recipientId?: number;
		messageDisplayName?: string;
		messageId?: number;
		senderId?: number;
		senderDisplayName?: string;     
    } = {}
    ) {
        super('UserMessage'); 

        this.recipientDisplayName = recipientDisplayName;
		this.recipientId = recipientId;
		this.messageDisplayName = messageDisplayName;
		this.messageId = messageId;
		this.senderId = senderId;
		this.senderDisplayName = senderDisplayName;
    }
}


export class UserMessageSaveBody extends BaseEntity
{
    userMessageDTO?: UserMessage;

    constructor(
    {
        userMessageDTO
    }:{
        userMessageDTO?: UserMessage;     
    } = {}
    ) {
        super('UserMessageSaveBody'); 

        this.userMessageDTO = userMessageDTO;
    }
}


export class UserMessageMainUIForm extends BaseEntity
{
    userMessageDTO?: UserMessage;

    constructor(
    {
        userMessageDTO
    }:{
        userMessageDTO?: UserMessage;     
    } = {}
    ) {
        super('UserMessageMainUIForm'); 

        this.userMessageDTO = userMessageDTO;
    }
}


export class UserNotification extends BaseEntity
{
    notificationDisplayName?: string;
	notificationId?: number;
	userDisplayName?: string;
	userId?: number;
	isMarkedAsRead?: boolean;

    constructor(
    {
        notificationDisplayName,
		notificationId,
		userDisplayName,
		userId,
		isMarkedAsRead
    }:{
        notificationDisplayName?: string;
		notificationId?: number;
		userDisplayName?: string;
		userId?: number;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('UserNotification'); 

        this.notificationDisplayName = notificationDisplayName;
		this.notificationId = notificationId;
		this.userDisplayName = userDisplayName;
		this.userId = userId;
		this.isMarkedAsRead = isMarkedAsRead;
    }
}


export class UserNotificationSaveBody extends BaseEntity
{
    userNotificationDTO?: UserNotification;

    constructor(
    {
        userNotificationDTO
    }:{
        userNotificationDTO?: UserNotification;     
    } = {}
    ) {
        super('UserNotificationSaveBody'); 

        this.userNotificationDTO = userNotificationDTO;
    }
}


export class UserNotificationMainUIForm extends BaseEntity
{
    userNotificationDTO?: UserNotification;

    constructor(
    {
        userNotificationDTO
    }:{
        userNotificationDTO?: UserNotification;     
    } = {}
    ) {
        super('UserNotificationMainUIForm'); 

        this.userNotificationDTO = userNotificationDTO;
    }
}


export class UserVotingThemeItem extends BaseEntity
{
    userDisplayName?: string;
	userId?: number;
	votingThemeItemDisplayName?: string;
	votingThemeItemId?: number;
	voteTypeDisplayName?: string;
	voteTypeId?: number;

    constructor(
    {
        userDisplayName,
		userId,
		votingThemeItemDisplayName,
		votingThemeItemId,
		voteTypeDisplayName,
		voteTypeId
    }:{
        userDisplayName?: string;
		userId?: number;
		votingThemeItemDisplayName?: string;
		votingThemeItemId?: number;
		voteTypeDisplayName?: string;
		voteTypeId?: number;     
    } = {}
    ) {
        super('UserVotingThemeItem'); 

        this.userDisplayName = userDisplayName;
		this.userId = userId;
		this.votingThemeItemDisplayName = votingThemeItemDisplayName;
		this.votingThemeItemId = votingThemeItemId;
		this.voteTypeDisplayName = voteTypeDisplayName;
		this.voteTypeId = voteTypeId;
    }
}


export class UserVotingThemeItemSaveBody extends BaseEntity
{
    userVotingThemeItemDTO?: UserVotingThemeItem;

    constructor(
    {
        userVotingThemeItemDTO
    }:{
        userVotingThemeItemDTO?: UserVotingThemeItem;     
    } = {}
    ) {
        super('UserVotingThemeItemSaveBody'); 

        this.userVotingThemeItemDTO = userVotingThemeItemDTO;
    }
}


export class UserVotingThemeItemMainUIForm extends BaseEntity
{
    userVotingThemeItemDTO?: UserVotingThemeItem;

    constructor(
    {
        userVotingThemeItemDTO
    }:{
        userVotingThemeItemDTO?: UserVotingThemeItem;     
    } = {}
    ) {
        super('UserVotingThemeItemMainUIForm'); 

        this.userVotingThemeItemDTO = userVotingThemeItemDTO;
    }
}


export class VoteType extends BaseEntity
{
    name?: string;
	icon?: string;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		icon,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		icon?: string;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('VoteType'); 

        this.name = name;
		this.icon = icon;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class VoteTypeSaveBody extends BaseEntity
{
    voteTypeDTO?: VoteType;

    constructor(
    {
        voteTypeDTO
    }:{
        voteTypeDTO?: VoteType;     
    } = {}
    ) {
        super('VoteTypeSaveBody'); 

        this.voteTypeDTO = voteTypeDTO;
    }
}


export class VoteTypeMainUIForm extends BaseEntity
{
    voteTypeDTO?: VoteType;

    constructor(
    {
        voteTypeDTO
    }:{
        voteTypeDTO?: VoteType;     
    } = {}
    ) {
        super('VoteTypeMainUIForm'); 

        this.voteTypeDTO = voteTypeDTO;
    }
}


export class VotingTheme extends BaseEntity
{
    name?: string;
	description?: string;
	votingThemeItemsDTOList?: VotingThemeItem[];
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		description,
		votingThemeItemsDTOList,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		description?: string;
		votingThemeItemsDTOList?: VotingThemeItem[];
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('VotingTheme'); 

        this.name = name;
		this.description = description;
		this.votingThemeItemsDTOList = votingThemeItemsDTOList;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class VotingThemeSaveBody extends BaseEntity
{
    votingThemeDTO?: VotingTheme;
	votingThemeItemsDTO?: VotingThemeItem[];

    constructor(
    {
        votingThemeDTO,
		votingThemeItemsDTO
    }:{
        votingThemeDTO?: VotingTheme;
		votingThemeItemsDTO?: VotingThemeItem[];     
    } = {}
    ) {
        super('VotingThemeSaveBody'); 

        this.votingThemeDTO = votingThemeDTO;
		this.votingThemeItemsDTO = votingThemeItemsDTO;
    }
}


export class VotingThemeMainUIForm extends BaseEntity
{
    votingThemeDTO?: VotingTheme;
	orderedVotingThemeItemsDTO?: VotingThemeItem[];

    constructor(
    {
        votingThemeDTO,
		orderedVotingThemeItemsDTO
    }:{
        votingThemeDTO?: VotingTheme;
		orderedVotingThemeItemsDTO?: VotingThemeItem[];     
    } = {}
    ) {
        super('VotingThemeMainUIForm'); 

        this.votingThemeDTO = votingThemeDTO;
		this.orderedVotingThemeItemsDTO = orderedVotingThemeItemsDTO;
    }
}


export class VotingThemeItem extends BaseEntity
{
    name?: string;
	description?: string;
	orderNumber?: number;
	votingThemeDisplayName?: string;
	votingThemeId?: number;
	usersVotedDTOList?: UserVotingThemeItem[];
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		description,
		orderNumber,
		votingThemeDisplayName,
		votingThemeId,
		usersVotedDTOList,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		description?: string;
		orderNumber?: number;
		votingThemeDisplayName?: string;
		votingThemeId?: number;
		usersVotedDTOList?: UserVotingThemeItem[];
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('VotingThemeItem'); 

        this.name = name;
		this.description = description;
		this.orderNumber = orderNumber;
		this.votingThemeDisplayName = votingThemeDisplayName;
		this.votingThemeId = votingThemeId;
		this.usersVotedDTOList = usersVotedDTOList;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class VotingThemeItemSaveBody extends BaseEntity
{
    votingThemeItemDTO?: VotingThemeItem;

    constructor(
    {
        votingThemeItemDTO
    }:{
        votingThemeItemDTO?: VotingThemeItem;     
    } = {}
    ) {
        super('VotingThemeItemSaveBody'); 

        this.votingThemeItemDTO = votingThemeItemDTO;
    }
}


export class VotingThemeItemMainUIForm extends BaseEntity
{
    votingThemeItemDTO?: VotingThemeItem;

    constructor(
    {
        votingThemeItemDTO
    }:{
        votingThemeItemDTO?: VotingThemeItem;     
    } = {}
    ) {
        super('VotingThemeItemMainUIForm'); 

        this.votingThemeItemDTO = votingThemeItemDTO;
    }
}

