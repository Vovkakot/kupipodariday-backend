import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Max, Min} from "@nestjs/class-validator";
import {IsEmail} from "class-validator";

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
        unique:true
    })
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column()
    wishes: boolean;

    @Column()
    offers: boolean;

    @Column()
    wishlists: boolean;
} 