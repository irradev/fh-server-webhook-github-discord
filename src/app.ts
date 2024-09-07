import express, { Request, Response } from 'express';
import { envs } from './config/envs';
import { GithubController } from './presentation/github/controller';
import { GitHubService } from './presentation/services/github.service';
import { DiscordService } from './presentation/services/discord.service';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware';


(async () => {
    await main();
})();

async function main() {
    const app = express();

    app.use( express.json() );
    app.use( GithubSha256Middleware.verifySignature );

    const githubService = new GitHubService();
    const discordService = new DiscordService();
    const controller = new GithubController(githubService, discordService);

    app.post('/api/github', controller.webhookHandler );

    app.listen(envs.PORT, () => {
        console.log('App running on port ' + envs.PORT);
    });


}