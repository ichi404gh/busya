import { AbstractModule } from '.';
import { Update } from "../interfaces";
import _const from "../const";
import tgApi from '../services/TelegramApiService'


export default class PuckTrigger extends AbstractModule {
    receiveText = true

    private canPuck = true

    protected Filter(update: Update): boolean {
        return /^пу+к/i.test(update.message.text) && this.canPuck
    }

    protected async ProcessUpdate(update: Update) {
        this.canPuck = false

        setTimeout(() => {
            this.canPuck = true
        }, 60_000)


        tgApi.SendPhoto({
            chat_id: update.message.chat.id,
            photo: _const.bubleUrls.pick(),
            reply_to_message_id: update.message.message_id
        }).then(x => {
            setTimeout(() => {
                tgApi.DeleteMessage({ chat_id: x.chat.id, message_id: x.message_id })
            }, 10_000)
        }).catch(e => console.error(e))

    }
}