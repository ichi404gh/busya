import config from '../config'
import fetch from 'node-fetch'
import { Message } from '../interfaces';


interface Result<T> {
    ok: boolean,
    result?: T
}
interface SendPhotoParams {
    chat_id: number | string
    photo: string
    caption?: string
    parse_mode?: string
    disable_notification?: boolean
    reply_to_message_id?: number
}
interface ReplyMessageParams {
    chat_id: number | string
    text: string
    reply_to_message_id: number
}

interface DeleteMessageParams {
    chat_id: number | string
    message_id: number
}

class TgApi {
    SendPhoto(params: SendPhotoParams): Promise<Message> {
        return call("sendPhoto", params)
    }


    ReplyMessage(params: ReplyMessageParams): Promise<Message> {
        return call("sendMessage", params)
    }

    DeleteMessage(params: DeleteMessageParams) {
        return call("deleteMessage", params)
    }
}

function call(method: string, params: any): Promise<Message> {
    return fetch(`https://api.telegram.org/bot${config.token}/${method}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(params)
    })
        .then(x => x.json())
        .then((x: Result<Message>) => x.result)
}

export default new TgApi()