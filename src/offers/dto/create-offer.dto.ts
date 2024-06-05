import { IsNumber, IsBoolean, IsOptional, IsPositive } from 'class-validator';

export class CreateOfferDto {
    @IsNumber()
    itemId: number;

    @IsNumber()
    amount: number;

    @IsBoolean()
    hidden: boolean;
}
