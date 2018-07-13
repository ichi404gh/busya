import { Update, SendPhotoParams } from "./interfaces";
import config from "./config"
import _const from "./const"
import fetch from 'node-fetch'


const sendPhoto = (params: SendPhotoParams): void => {
    console.log(JSON.stringify(params))
    fetch(`https://api.telegram.org/bot${config.token}/sendPhoto`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(params)
    }).then(x => x.json()).then(x => console.log(x))
}

export default async (update: Update): Promise<void> => {
    if (update.message === undefined){
        return
    }
    if (/пук/i.test(update.message.text)) {
        sendPhoto({
            chat_id: update.message.chat.id,
            photo: _const.bubleUrl,
            reply_to_message_id: update.message.message_id
        })
    }
}