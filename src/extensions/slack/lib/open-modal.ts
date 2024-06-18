import { Slack } from "../../../lib/bolt.js";
import { handleError } from "../../../lib/handleError.js";

export async function openModal({triggerId, asyncMessageView}) {
    try {
        let viewID
        const loadingDelay = Slack.views.open({
            trigger_id: triggerId,
            view: loadingMessageView()
        }).then(res => viewID = res?.view?.id);
        const minDelay = new Promise((resolve) => setTimeout(resolve, 400)); // raccoons take their time to wake up!

        await Promise.all([loadingDelay, minDelay]);

        if (!viewID) {
            throw new Error("View ID not found");
        }

        await Slack.views.update({
            view_id: viewID,
            view: asyncMessageView
        })
    } catch (error) {
        handleError(error)
    }
}

async function loadingMessageView() {
    // todo: make a loading message
    // preferably from flavor text
}