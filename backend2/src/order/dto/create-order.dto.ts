import {
    IsArray,
    IsNumber,
    IsString,
    IsUUID,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';


export class CreateOrderItemDto {
    @IsUUID()
    productId!: string;
    @IsNumber()
    quantity!: number;
}

export class CreateOrderDto {
    @IsNumber()
    totalAmount!: number;

    @IsString()
    paymentId?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items!: CreateOrderItemDto[];
}
