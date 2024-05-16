import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { Product } from "./Product";

@Entity()
@Unique(["product","requiredProduct"])
export class RequiredProducts {
    @ManyToOne(type => Product, product => product.requiredProducts, {
        onDelete: "CASCADE",
        primary: true
    })
    product: Product;

    @ManyToOne(type => Product, product => product.id, {
        onDelete: "CASCADE",
        primary: true, 
        eager: true
    })
    requiredProduct: Product;

    @Column({
        default: 1
    })
    amount: number;
}