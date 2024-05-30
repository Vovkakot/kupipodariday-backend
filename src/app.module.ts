import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import {WishesModule} from './wishes/wishes.module';
import {OffersModule} from './offers/offers.module';
import {WishlistsModule} from './wishlists/wishlists.module';
import {Wish} from "./wishes/entities/wish.entity";
import {Wishlist} from "./wishlists/entities/wishlist.entity";
import {User} from "./users/entities/user.entity";
import {Offer} from "./offers/entities/offer.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'student',
            password: 'student',
            database: 'kupipodariday',
            entities: [Wish, Wishlist, User, Offer],
            synchronize: true,
        }),
        UsersModule,
        WishesModule,
        OffersModule,
        WishlistsModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
