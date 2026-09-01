import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateCartDto {
  @IsUUID()
  productId!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;
}



export class CreateWishlistDto {
  @IsUUID()
  productId!: string;
}