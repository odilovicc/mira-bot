import { Output } from "@jfonx/console-utils";
import { ofetch } from "ofetch";

export class AskOllama {

    public static ask(msg: string) {
        return new Promise((res, rej) => {
            ofetch('http://localhost:11434/api/generate', {
                method: "POST",
                body: {
                    model: "mirabot",
                    prompt: msg,
                    stream: false
                }
            })
                .then((data) => res(data))
                .catch(err => rej(err))
        })
    }
}
