/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  client: string;

  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}