import process from "process";
import {forwardRef, Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module";
import {WishesModule} from "../wishes/wishes.module";
import {WishlistsModule} from "../wishlists/wishlists.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UsersModule),
        forwardRef(() => WishesModule),
        forwardRef(() => WishlistsModule),
        JwtModule.register({
            secret: 'SECRET',
            signOptions: {
                expiresIn: '24h'
            },
        })],
    exports: [
        AuthService, JwtModule
    ]
})
export class AuthModule {
}