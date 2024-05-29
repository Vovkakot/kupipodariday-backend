import {Column, PrimaryGeneratedColumn} from "typeorm";
import {IsUrl, Max, Min} from "@nestjs/class-validator";

export class Wish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Min(1)
    @Max(250)
    name: string

    @Column()
    @IsUrl()
    link: string

    @Column()
    @IsUrl()
    image: string

    @Column({
        type:'integer'
    })
    raised: number

    @Column()
    owner: number


    @Column()
    @Min(1)
    @Max(1024)
    description : string
}
