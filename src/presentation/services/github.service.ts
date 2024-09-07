import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";


export class GitHubService {
    constructor() {}

    onStar(payload: GitHubStarPayload): string {

        let message: string = '';
        const { action, sender, repository } = payload;

        message = `Hey ${sender.login}! You ${action} star on ${repository.full_name}!`;
       

        return message;
    }


    onIssue(payload: GitHubIssuePayload): string {

        const { action, issue, repository } = payload;

        return `An issue (${issue.title}) was ${action} by ${issue.user.login} on ${repository.full_name}!`;
        
    }
}