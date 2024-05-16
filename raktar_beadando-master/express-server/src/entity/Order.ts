import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerName: string;

    @Column({
        nullable: true
    })
    customerEmail: string;

    @Column()
    customerPhone: string;

    @Column({
        type: "date"
    })
    orderDate: Date;

    @ManyToOne(type => Product, product => product.orders, {
        onDelete: "CASCADE",
        eager: true
    })
    product: Product;

    @Column({
        default: 1
    })
    amount: number
}