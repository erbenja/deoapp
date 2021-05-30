
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import {AccountEntity} from "../account/account.entity";
import {PermissionRO} from "./permission.dto";
import {BaseEntity} from "../shared/base-entity";
import {PermissionTypeEntity} from "../permission-type/permission-type.entity";
import {ROargs} from "../shared/base-ro";

@Entity('permission')
export class PermissionEntity extends BaseEntity<PermissionRO>{
  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(type => PermissionTypeEntity, type => type.permissions, {
    eager: true,
  })
  type: PermissionTypeEntity;

  @ManyToOne(type => AccountEntity, account => account.permissions)
  account: AccountEntity;

  toResponseObject(args?: ROargs): PermissionRO {
    const {id, type} = this;
    const responseObject: PermissionRO = {
      id
    };

    if(type != undefined){
      responseObject.type = type.toResponseObject();
    }


    return responseObject;
  }
}
