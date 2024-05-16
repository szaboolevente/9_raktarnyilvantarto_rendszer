import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Order } from "./Order";
import { RequiredParts } from "./RequiredParts";
import { RequiredProducts } from "./RequiredProducts";

@Entity()
@Unique(["name"])
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => RequiredParts, required => required.product, {
        cascade: ['insert', 'update'],
        eager: true
    })
    parts: RequiredParts[];

    @OneToMany(type => RequiredProducts, required => required.product, {
        cascade: ['insert', 'update']
    })
    requiredProducts: RequiredProducts[];

    @OneToMany(type => Order, order => order.product)
    orders: Order[];
}