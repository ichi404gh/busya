import config from "../config";

interface SendPhotoParams {
    chat_id: number | string
    photo: string
    caption?: string
    parse_mode?: string
    disable_notification?: boolean
    reply_to_message_id?: number
}

class TgApi {
    SendPhoto(params: SendPhotoParams): void {
        call("sendPhoto", params)
    }
}

function call(method: string, params: any) {
    fetch(`https://api.telegram.org/bot${config.token}/${method}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(params)
    })
}

export default new TgApi()