import { Repository } from "typeorm";

export class Controller {
    repository: Repository<any>;

    create = async (req, res) => {
        const entity = this.repository.create(req.body);
        if(entity.id) {
            entity.id = null;
        }

        try {
            const insertedEntity = await this.repository.save(entity);
            res.status(201).json(insertedEntity);
        } catch(err) {
            res.status(500).json({message: err.message});
            console.log(err);
        }
    }

    getAll = async (req, res) => {
        try {
            const entities = await this.repository.find();
            res.json(entities);
        } catch(err) {
            res.status(500).json({message: err.message});
            console.log(err);
        }
    }

    delete = async (req, res) => {
        const id = parseInt(req.params.id);
        if(isNaN(id)) {
            return res.status(400).json({message: "Id parameter is missing or not a number!"});
        }
        
        try {
            const entity = await this.repository.findOne(id);
            if(!entity) {
                return res.status(404).json({message: "Entity with such id is not found!"});
            }

            await this.repository.delete(entity.id);
            res.json({message : `Entity with the id ${id} is deleted!`});
        } catch(err) {
            res.status(500).json({message: err.message});
            console.log(err);
        }
    }
}