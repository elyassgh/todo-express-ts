import { Expose } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class TodoDto {

    @Expose()
    @IsString()
    @IsNotEmpty()
    readonly title: string;


    @Expose()
    @IsBoolean()
    @IsNotEmpty()
    readonly completed: boolean;

}