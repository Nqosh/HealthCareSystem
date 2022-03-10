export interface Messages {
    id: number;
    senderId: number;
    senderKnownAs: string;
    senderPhotoUrl: string;
    recipientId: number;
    recipientKnownAs: string;
    recipientPhotoUrl: string;
    content: number;
    isRead: boolean;
    dateRead: Date;
    messageSent: Date;
}
