import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, JoinTable,
    ManyToMany,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {IsUrl, Max, Min} from "@nestjs/class-validator";
import {User} from "../../users/entities/user.entity";
import {Wish} from "../../wishes/entities/wish.entity";
@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Min(1)
    @Max(250)
    name: string

    @Column({ length: 1500 })
    description: string;

    @Column()
    @IsUrl()
    image: string

    @Column({
        type:"varchar"
    })
    @OneToMany(() => Wish, wish => wish.wishlist)
    items: Wish[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.wishlists)
    owner: User;
}
