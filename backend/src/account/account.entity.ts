
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, OneToOne} from 'typeorm';
import {BaseEntity} from "../shared/base-entity";
import {PermissionEntity} from "../permission/permission.entity";
import {AccountRO} from "./account.dto";
import {PostRO} from "../post/post.dto";
import {Hash} from "crypto";
import {EvaluatedQuestionEntity} from "../evaluated-question/evaluated-question.entity";
import {hash} from "typeorm/util/StringUtils";
import {QuestionOptionEntity} from "../question-option/question-option.entity";
import {GuaranteeEntity} from "../guarantee/guarantee.entity";
import {ROargs} from "../shared/base-ro";

@Entity('account')
export class AccountEntity extends BaseEntity<AccountRO> {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  surname: string;

  @OneToMany(type => PermissionEntity, permission => permission.account, {
    // eager: true,
    // cascade: true
  })
  permissions: PermissionEntity[];

  @OneToMany(type => EvaluatedQuestionEntity, evaluation => evaluation.evaluator)
  evaluations: EvaluatedQuestionEntity[];

  @OneToOne(type => GuaranteeEntity, guarantee => guarantee.account)
  guarantee: GuaranteeEntity;

  @BeforeInsert()
  hashPassword(){
    //TODO
    this.password = hash(this.password);
  }

  verifyPassword(inputPass: string): boolean{
    const hashedPass = hash(inputPass);
    return hashedPass == this.password;
  }

  toResponseObject(args?: ROargs): AccountRO {
    const {id, username, email, firstname, surname} = this;
    const responseObject: AccountRO = {
      id,
      username,
      email,
      firstname,
      surname
    };

    if (this.permissions != undefined) {
      const permissions = this.permissions.map(p => p.toResponseObject());
      responseObject.permissions = permissions;
    }

    if (this.guarantee != undefined) {
      const guarantee = this.guarantee.toResponseObject()
      responseObject.guarantee = guarantee;
    }

    return responseObject;
    //TODO
  }

}
