import { getRepository } from "typeorm";
import { Order } from "../entity/Order";
import { Part } from "../entity/Part";
import { Product } from "../entity/Product";
import { Controller } from "./controller";

export class OrderController extends Controller {
    repository = getRepository(Order);
    productRepository = getRepository(Product);
    partRepository = getRepository(Part);

    makeOrder = async (req, res) => {
        const createdEntity = this.repository.create(req.body as Order);
        if(!createdEntity) {
            return res.status(400).json({message: "Product details are missing!"});
        }
        if(createdEntity.id) {
            createdEntity.id = null;
        }

        try {
            const entity = await this.productRepository.findOne(createdEntity.product.id, {relations: ["requiredProducts", "parts"]});
            if(!entity) {
                return res.status(404).json({message: "Can't find product!"});
            }

            const partMap = await this.countParts(entity, new Map<number, number>(), createdEntity.amount);
            const parts = await this.partRepository.find();

            if(!this.everyPartIsAvailable(partMap, parts)){
                return res.status(400).json({message: "There is not enough part to make this order!"});
            }

            const insertedOrder = await this.repository.save(createdEntity);

            res.status(201).json({message: "Order has been created successfully!", order: insertedOrder});
        } catch(err) {
            res.status(500).json({message: err.message});
            console.log(err);
        }
    }

    async countParts(product: Product, partMap : Map<number, number>, multiplier: number) {
        product.parts.forEach((partCounter) => {
            if(partMap.has(partCounter.part.id)) { 
                partMap.set(partCounter.part.id, partMap.get(partCounter.part.id) + (partCounter.amount * multiplier));
            } else {
                partMap.set(partCounter.part.id, (partCounter.amount * multiplier));
            }
        });

        
        for(let required of product.requiredProducts) {
            const requiredProduct = await this.productRepository.findOne(required.requiredProduct.id, {relations: ["requiredProducts"]});
            partMap = await this.countParts(requiredProduct, partMap, multiplier*required.amount);
        }
        
        return partMap;
    }

    private everyPartIsAvailable(partMap : Map<number, number>, partList : Part[]) : boolean {
        for(const part of partList) {
            if(!partMap.has(part.id)){
                continue;
            }
            
            if(partMap.get(part.id) > part.amount){
                return false;
            }
        }

        return true;
    }
}