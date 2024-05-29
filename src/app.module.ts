import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { Wishlists\Module } from './wishlists/wishlists/.module';
import { OffersModule } from './offers/offers.module';
import { WishlistsModule } from './wishlists/wishlists.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'kupipodariday',
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    WishesModule,
    Wishlists\Module, OffersModule, WishlistsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
