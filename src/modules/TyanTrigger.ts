import { AbstractModule } from ".";
import { Update } from "../interfaces";
import _const from "../const";
import tgApi from "../services/TelegramApiService"


export default class A extends AbstractModule {
    private canReactTyan = true

    protected Filter(update: Update): boolean {
        return update.message !== undefined && /(\s|^)тя+н/i.test(update.message.text) && this.canReactTyan
    }

    protected async ProcessUpdate(update: Update) {
        this.canReactTyan = false

        setTimeout(() => {
            this.canReactTyan = true
        }, 60_000)

        const randomIndex = Math.floor(Math.random() * _const.foxUrls.length)

        tgApi.SendPhoto({
            chat_id: update.message.chat.id,
            photo: _const.foxUrls[randomIndex],
            reply_to_message_id: update.message.message_id
        }).then(x => {
            setTimeout(() => {
                tgApi.DeleteMessage({ chat_id: x.chat.id, message_id: x.message_id })
            }, 10_000)
        }).catch(e => console.error(e))
    }
}