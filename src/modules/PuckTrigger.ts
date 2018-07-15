import { AbstractModule } from '.';
import { Update } from "../interfaces";
import _const from "../const";
import tgApi from '../services/TelegramApiService'


export default class PuckTrigger extends AbstractModule {
    private canPuck = true

    protected Filter(update: Update): boolean {
        return update.message !== undefined && /пук/i.test(update.message.text) && this.canPuck
    }

    protected async ProcessUpdate(update: Update) {
        this.canPuck = false

        setTimeout(() => {
            this.canPuck = true
        }, 60_000)

        const randomIndex = Math.floor(Math.random() * _const.bubleUrls.length)

        tgApi.SendPhoto({
            chat_id: update.message.chat.id,
            photo: _const.bubleUrls[randomIndex],
            reply_to_message_id: update.message.message_id
        })
    }
}