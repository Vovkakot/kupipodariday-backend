import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {IsUrl, Max, Min} from '@nestjs/class-validator';
import {User} from "../../users/entities/user.entity";
import {Offer} from "../../offers/entities/offer.entity";
import {Wishlist} from "../../wishlists/entities/wishlist.entity";
@Entity()
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

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    raised: number

    @Column({
        type:"varchar"
    })
    @ManyToOne(() => User, user => user.wishes)
    owner: User


    @Column()
    @Min(1)
    @Max(1024)
    description: string

    @Column({
        type:"varchar"
    })
    @OneToMany(() => Offer, offer => offer.item)
    offers: Offer[];

    @Column({ default: 0 })
    copied: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Wishlist, wishlist => wishlist.items)
    wishlist: Wishlist;
}
