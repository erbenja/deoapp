
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import {AccountEntity} from "../account/account.entity";
import {BaseEntity} from "../shared/base-entity";
import {PermissionTypeRO, PermissionTypes} from "./permission-type.dto";
import {PermissionEntity} from "../permission/permission.entity";
import {ROargs} from "../shared/base-ro";

@Entity('permissionType')
export class PermissionTypeEntity extends BaseEntity<PermissionTypeRO>{
  @PrimaryGeneratedColumn()
  id: number;


  @Column({type: 'enum', enum: PermissionTypes})
  name: PermissionTypes;

  @OneToMany(type => PermissionEntity, permission => permission.type)
  permissions: PermissionEntity[];

  toResponseObject(args?: ROargs): PermissionTypeRO {
    const {id, name} = this;
    const responseObject: PermissionTypeRO = {
      id, name
    };

    return responseObject;
  }
}
