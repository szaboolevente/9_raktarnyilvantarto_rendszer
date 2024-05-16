import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { RequiredParts } from "./RequiredParts";

@Entity()
@Unique(["name"])
export class Part {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: "date"
    })
    receiptDate: Date;

    @Column({
        default: 1
    })
    amount: number;

    @OneToMany(type => RequiredParts, required => required.product)
    products: RequiredParts[];
}