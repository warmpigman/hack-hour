import { KnownBlock } from "@slack/bolt";
import { Actions } from "../../../lib/constants.js";
import { t } from "../../../lib/templates.js";

export class Hack {
    public static hack(onboarding: boolean): KnownBlock[] {
        // Are you sure you want to hack this session?
        return [
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "hack"
                },
                "label": {
                    "type": "plain_text",
                    "text": "what are you gonna work on for the next hour?",
                    "emoji": true
                },
                "block_id": "hack"
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "start the timer",
                            "emoji": true
                        },
                        "action_id": Actions.HACK
                    }
                ]
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": onboarding ? t('onboarding.new_face', {}) : t('hack', {})
                    }
                ]
            }
        ]
    }
}