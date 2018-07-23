import { AbstractModule } from ".";
import { Update } from "../interfaces";
import tgApi from "../services/TelegramApiService";
import _const from "../const";

export default class AnswerModule extends AbstractModule {
    receiveText = true

    protected Filter(update: Update): boolean {
        return /^буся,.*\?$/i.test(update.message.text)
    }

    protected async ProcessUpdate(update: Update) {
        let matches
        let text: string

        if (matches = (/буся, (.*) или (.*)\?/i.exec(update.message.text))) {
            text = [matches[1], matches[2]].pick()
        } else {
            text = _const.yesNoAnswers.pick()
        }
        tgApi.ReplyMessage({
            chat_id: update.message.chat.id,
            reply_to_message_id: update.message.message_id,
            text
        })
    }
}