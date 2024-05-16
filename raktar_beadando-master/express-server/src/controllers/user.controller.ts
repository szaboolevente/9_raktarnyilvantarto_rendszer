import { getRepository, Repository } from "typeorm";
import * as jwt from 'jsonwebtoken';
import { User } from "../entity/User";
import { config } from "../validators/validators";

export class UserController {
    private repository : Repository<User> = getRepository(User);

    login = async (req, res) => {
        const reqUser = this.repository.create(req.body as User);
        if(!reqUser) {
            return res.status(404).json({message: "Not valid user given!"});
        }

        try {
            const user = await this.repository.findOne({email: reqUser.email});
            if(!user) {
                return res.status(404).json({message: "Couldn't find user!"});
            }

            if(user.password !== reqUser.password) {
                return res.status(400).json({message: "Wrong password!"});
            }

            const token = jwt.sign({id: user.id, email: user.email},config.secret, {
                expiresIn: config.expiration
            });
            res.json({
                message: "Successful login!",
                user: user,
                auth: token
            });
        } catch(err) {
            return res.status(500).json({message: err});
        }
    }

    signup = async (req, res) => {
        const reqUser = this.repository.create(req.body as User);
        if(!reqUser) {
            return res.status(404).json({message: "Not valid user given!"});
        }

        if(reqUser.id) {
            reqUser.id = 0;
        }

        try {
            const email = await this.repository.findOne({email: reqUser.email});
            if(email) {
                return res.status(400).json({message: "This email is already in use!"});
            }

            const user = await this.repository.save(reqUser);
            if(!user) {
                return res.status(400).json({message: "Some problem occured during save!"});
            }
            res.json({message: "Registration is successful!"});
        } catch(err) {
            return res.status(500).json({message: err});
        }
    }
}