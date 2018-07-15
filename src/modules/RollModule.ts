import { AbstractModule } from ".";
import { Update } from "../interfaces";
import RollService from "../services/RollService";
import tgApi from "../services/TelegramApiService";

export default class RollModule extends AbstractModule {
    protected Filter(update: Update): boolean {
        return update.message !== undefined && /^\/roll/.test(update.message.text)
    }

    protected async ProcessUpdate(update: Update) {
        try {
            const value = this.GetRollFromCommand(update.message.text)
            tgApi.ReplyMessage({
                chat_id: update.message.chat.id,
                reply_to_message_id: update.message.message_id,
                text: value.toString()
            })
        } catch (e) { }
    }

    private GetRollFromCommand(command: string): number {
        let matches
        let res = 0

        const text = command

        if (matches = /\/roll (\d+)d(\d+)/.exec(text)) {
            if (parseInt(matches[1]) < 0 || parseInt(matches[2]) < 0) {
                throw new Error("Argument exception")
            }

            res = RollService.rollDice(parseInt(matches[1]), parseInt(matches[2]))
        } else if (matches = /\/roll (\d+) (\d+)/.exec(text)) {
            res = RollService.roll(parseInt(matches[1]), parseInt(matches[2]))
        } else if (matches = /\/roll (\d+)/.exec(text)) {
            res = RollService.roll(1, parseInt(matches[1]))
        } else {
            res = RollService.roll()
        }
        return res
    }
}