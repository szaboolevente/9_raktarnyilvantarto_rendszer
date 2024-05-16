import { getRepository } from "typeorm";
import { Part } from "../entity/Part";
import { Controller } from "./controller";

export class PartController extends Controller {
    repository = getRepository(Part);

    increaseAmount = async (req, res) => {
        const increase = parseInt(req.query.amount);
        if(isNaN(increase)) {
            return res.status(400).json({message: "Amount querry parameter is missing or not a number!"});
        }

        const id = parseInt(req.params.id);
        if(isNaN(id)) {
            return res.status(400).json({message: "Id parameter is missing or not a number!"});
        }
        
        try {
            const entity = await this.repository.findOne(id);
            if(!entity) {
                return res.status(404).json({message: "Entity with such id is not found!"});
            }

            const increasedAmount = entity.amount + increase;
            if(increasedAmount < 0) {
                return res.status(400).json({message: `More is needed (${-increase}), than is available ${entity.amount}!`});
            }

            await this.repository.update(entity, {amount : increasedAmount});
            res.json({newAmount: increasedAmount});
        } catch(err) {
            res.status(500).json({message: err.message});
        }
    }
}