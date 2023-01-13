import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entity.class';
import { Recipe } from '../../../interfaces/recipe.interface';
import { UserEntity } from '../../user/user.entity';


@Entity('recipes')
export class RecipeEntity extends BaseEntity implements Recipe {

  @Column()
  title!: string;

  @Column({ nullable: true })
  desc?: string;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  owner!: UserEntity;

}
