import { config, validEmail } from "./validators";
import * as jwt from 'jsonwebtoken';
import { getRepository } from "typeorm";
import { User } from "../entity/User";

const MAX_LENGTH = 256;
export function validSignUpUser(req, res, next) {
    if(!req.body.name || req.body.name.length > MAX_LENGTH) {
        return res.status(400).json({message: "Not valid username!"});
    }
    
    if(!req.body.email || !validEmail(req.body.email)) {
        return res.status(400).json({message: "Not valid email!"});
    }
    
    if(!req.body.password || req.body.password.length > MAX_LENGTH) {
        return res.status(400).json({message: "Not valid password!"});
    }

    next();
}

export function validLoginUser(req, res, next) {
    if(!req.body.email || !validEmail(req.body.email)) {
        return res.status(400).json({message: "Not valid email!"});
    }
    
    if(!req.body.password || req.body.password.length > MAX_LENGTH) {
        return res.status(400).json({message: "Not valid password!"});
    }

    next();
}

export async function isLogedIn(req, res, next) {
    const token = req.header('auth_t');
    if(!token) {
        return res.status(401).json({message: "Acces Denied!"});
    }

    try {
        const userRepository = getRepository(User);
        const payload : any = jwt.verify(token, config.secret);
        const user = await userRepository.findOne(payload.id);
        
        if(payload.email !== user.email) {
            return res.status(401).json({message: "Acces denied!"});
        }
        next();
    } catch(err) {
        console.log(err);
        return res.status(401).json({message: "Couldn't grant acces!"});
    }
}