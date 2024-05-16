import { getRepository } from "typeorm";
import { Product } from "../entity/Product";
import { RequiredParts } from "../entity/RequiredParts";
import { RequiredProducts } from "../entity/RequiredProducts";
import { Controller } from "./controller";

export class ProductController extends Controller {
    repository = getRepository(Product);
    reqPartRepository = getRepository(RequiredParts);
    reqProdRepository = getRepository(RequiredProducts);

    getAll = async (req, res) => {
        try {
            const entities = await this.repository.find({relations: ["requiredProducts"]});
            res.json(entities);
        } catch(err) {
            res.status(500).json({message: err.message});
            console.log(err);
        }
    };

    create = async (req, res) => {
        const entity = this.repository.create(req.body as Product);
        if(entity.id) {
            entity.id = null;
        }

        let rParts : RequiredParts[] = [];
        let rProds : RequiredProducts[] = [];
        
        const simpleProduct = this.repository.create({name: entity.name});
        try {
            const prodFromDb = await this.repository.findOne(entity.id);
            if(prodFromDb) {
                return res.status(400).json({message: "Product is already in the database!"});
            }
            
            const prodResult = await this.repository.save(simpleProduct);
            if(!prodResult) {
                return res.status(500).json({message: "Can insert product in the database!"});
            }
            
            for(let value of entity.parts) {
                let part : any = {
                    product: {
                        id: prodResult.id, name: prodResult.name
                    },
                    part: value.part,
                    amount: value.amount
                };
                rParts.push(part);
            }
            for(let value of entity.requiredProducts) {
                let prod : any = {
                    product: {
                        id: prodResult.id, name: prodResult.name
                    },
                    requiredProduct: value.requiredProduct,
                    amount: value.amount
                };
                rProds.push(prod);
            }

            const reqPartResult = await this.reqPartRepository.save(rParts);
            const reqProdResult = await this.reqProdRepository.save(rProds);
            if(reqPartResult.length < 1 && reqProdResult.length < 1) {
                return res.status(500).json({message: "Can't insert required part or required product relation in the database!"});
            }

            res.status(201).json(prodResult);
        } catch(err) {
            res.status(500).json({message: err.message});
            console.log(err);
        }
    };
}