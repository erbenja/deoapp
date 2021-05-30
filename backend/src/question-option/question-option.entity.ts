import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {BaseEntity} from "../shared/base-entity";
import {QuestionOptionRO} from "./question-option.dto";
import {QuestionEntity} from "../question/question.entity";
import {ROargs} from "../shared/base-ro";

@Entity('questionOption')
export class QuestionOptionEntity extends BaseEntity<QuestionOptionRO> {
    // @PrimaryGeneratedColumn()
    // id: number;

    @Column()
    content: string;

    @Column({nullable: true})
    img: string;


    @Column()
    correct: number;

    @ManyToOne(type => QuestionEntity, question => question.options, {
        onDelete: 'CASCADE',
    })
    question: QuestionEntity;

    toResponseObject(args?: ROargs): QuestionOptionRO {
        //TODO filter if send correct answer
        const {id, content, correct, img} = this;

        const responseObject: QuestionOptionRO = {
            id,
            content,
            img
        };

        if (args) {
            if (args.correctAnswers) {
                responseObject.correct = correct;
            }
        }

        if (this.question != undefined) {
            responseObject.questionId = this.question.id;
        }

        return responseObject;
    }
}
