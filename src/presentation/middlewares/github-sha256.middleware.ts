import { NextFunction, Request, Response } from "express";
import * as crypto from 'crypto';
import { envs } from "../../config/envs";

const WEBHOOK_SECRET = envs.WEBHOOK_SECRET;

const verify_signature = (req: Request) => {

    try {

        const signature = crypto
            .createHmac('sha256', WEBHOOK_SECRET)
            .update(JSON.stringify(req.body))
            .digest('hex');
        
        const xHubSignature = req.header('x-hub-signature-256') || 'unknown';
        let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
        let unstrusted = Buffer.from(xHubSignature, 'ascii');
    
        return crypto.timingSafeEqual(trusted, unstrusted);
        
    } catch (error) {
        return false;
    }
    
}

export class GithubSha256Middleware {


    static verifySignature(req: Request, res: Response, next: NextFunction) {

        if (!verify_signature(req)) {
            //TODO: Restringir peticiones no autorizadas en caso de recibir muchas
            return res.status(401).send('Unauthorized');
        }

        next();
    }

}