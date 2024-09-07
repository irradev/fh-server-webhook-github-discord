import { envs } from "../../config/envs";

export class DiscordService {
    
    private readonly discordWebhookUlr: string = envs.DISCORD_WEBHOOK_URL;

    constructor() {}

    async notify( message: string ) {
        const body = {
            content: message,
            // embeds: [
            //     {
            //         image: {
            //             url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjlpcWsyaXEyeGhycTZiOXJxNWowNDZ6NHpjYzNmOHNnZGRtaWpiMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PjZh99qBkDuhdGaFaT/giphy.gif',
            //         }
            //     }
            // ]
        }

        try {
            const response = await fetch( this.discordWebhookUlr, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
    
            if (!response.ok) {
                console.log('Error sending message to discord');
                return false;
            }
    
            return true;
            
        } catch (error) {
            console.log(error);

            return false;
        }
    }

}