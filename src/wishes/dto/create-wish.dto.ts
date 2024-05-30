import {User} from "../../users/entities/user.entity";


export class CreateWishDto {
    name:string;
    link:string;
    image:string;
    price:number;
    owner:User;
    description:string;
    copied:number
}