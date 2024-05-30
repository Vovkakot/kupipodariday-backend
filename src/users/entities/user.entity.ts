import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Max, Min} from "@nestjs/class-validator";
import {IsEmail} from "class-validator";
import {Wish} from "../../wishes/entities/wish.entity";
import {Offer} from "../../offers/entities/offer.entity";
import {Wishlist} from "../../wishlists/entities/wishlist.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        unique: true,
    })
    @Min(2)
    @Max(30)
    username: string;

    @Column({
        default: "Пока ничего не рассказал о себе"
    })
    @Min(2)
    @Max(200)
    about: string;

    @Column({
        default: "https://i.pravatar.cc/300"
    })
    avatar: string;

    @Column({
        unique: true
    })
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column({
        type:"varchar"
    })
    @OneToMany(() => Wish, wish => wish.owner)
    wishes: Wish[];

    @Column({
        type:"varchar"
    })
    @OneToMany(() => Offer, offer => offer.user)
    offers: Offer[];

    @Column({
        type:"varchar"
    })
    @OneToMany(() => Wishlist, wishlist => wishlist.items)
    wishlists: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 