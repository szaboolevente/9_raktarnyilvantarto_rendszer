import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { Part } from "./Part";
import { Product } from "./Product";

@Entity()
@Unique(["product","part"])
export class RequiredParts {
    @ManyToOne(type => Product, product => product.parts, {
        onDelete: "CASCADE", 
        primary: true
    })
    product: Product;

    @ManyToOne(type => Part, part => part.products, {
        onDelete: "CASCADE",
        primary: true, 
        eager: true
    })
    part: Part;

    @Column({
        default: 1
    })
    amount: number;
}