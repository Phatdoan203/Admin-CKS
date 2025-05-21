import jwt from 'jsonwebtoken'
import JwksRsa from 'jwks-rsa'
import { Request, Response, NextFunction } from 'express'

const issuer = 'http://localhost:8080/realms/master';
const client = JwksRsa({
    jwksUri:`${issuer}/protocol/openid-connect/certs`
});

function getKey(header : any, callback : any) {
    client.getSigningKey(header.kid, function (err, key){
        if (err) {
        callback(err, null);
        } else {
        const signingKey = key?.getPublicKey(); // hoặc getPublicPem() tùy phiên bản
        if (!signingKey) {
            callback(new Error('No public key found'), null);
        } else {
            callback(null, signingKey);
        }
        }
    });
};

export const verifyToken = (req : Request, res : Response, next : NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({message : 'No token provided'})
        return;
    };

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        getKey,
        {
            issuer,
            algorithms: ['RS256']
        },
        (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err);
                return res.status(401).json({ message: 'Invalid token' });
            }

            (req as any).user = decoded
            next();
        }
    )
}

export const requireRole = (requiredRole : string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        const roles = user?.realm_access?.roles || [];

        if(!roles.includes(requiredRole)){
            res.status(403).json({ message: 'Forbidden: insufficient role'})
        }


        next();
    }
}