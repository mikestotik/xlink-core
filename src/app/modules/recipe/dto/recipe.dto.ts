import { PartialType } from '@nestjs/mapped-types';
import { UserDTO } from 'app/modules/user/user.dto';
import { Transform } from 'class-transformer';


export class CreateRecipeDTO {
    title!: string;
    desc?: string;
}


export class UpdateRecipeDTO extends PartialType(CreateRecipeDTO) {

}


export class RecipeDTO {
    title!: string;
    desc?: string;

    @Transform(({ value }) => value.id)
    owner!: UserDTO;
}