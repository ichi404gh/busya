export interface Update {
    update_id: number
    message?: Message
}

export interface Message {
    message_id: number
    from: User
    chat: Chat
    date: number
    text?: string
    sticker?: Sticker 
}

export interface User {
    id: number
    is_bot: boolean,
    first_name: string,
    last_name?: string | null,
    username?: string | null,
    language_code?: string
}

export interface PrivateChat {
    id: number
    first_name?: string,
    last_name?: string,
    username?: string,
    type: 'private'
}
export interface Sticker {
    width: number
    height: number
    emoji: string
    set_name: string
    thumb: {
        file_id: string
        file_size: number
        width: number
        height: number
    }
    file_id: string
    file_size: number
}
type Chat = PrivateChat


export interface SendPhotoParams {
    chat_id: number|string
    photo: string
    caption?: string
    parse_mode?: string
    disable_notification?: boolean
    reply_to_message_id?: number
}