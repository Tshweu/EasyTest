import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { QuestionTypes } from '../../../models/question-type';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatRadioModule
  ],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss'
})
export class QuestionFormComponent {
  @Input() questionForm: FormGroup = this._fb.group({
    questionType: ['',Validators.required],
    description: ['',Validators.required],
    answers: this._fb.array([])
  });
  @Output() questionFormChange = new EventEmitter<FormGroup>();

  questionTypes = QuestionTypes;
  questionTypesList = [
    QuestionTypes.MissingWord,
    QuestionTypes.MultipleChoice,
    QuestionTypes.TrueFalse
  ]
  constructor(private _fb: FormBuilder){}

  get answers() {
    return this.questionForm.controls['answers'] as FormArray;
  }

  addAnswer(isCorrect: boolean = false) {
    const answerForm = this._fb.group({
      description: ['', Validators.required],
      isCorrect: [isCorrect,Validators.required]
    });
    this.answers.push(answerForm);
  }

  deleteCondition(answerIndex: number) {
    this.answers.removeAt(answerIndex);
  }

  setAnswers(selectedValue: string){
    switch(selectedValue){
      case this.questionTypes.MissingWord:
        this.answers.clear();
        break;
      case this.questionTypes.MultipleChoice:
        this.answers.clear();
        break;
      case this.questionTypes.TrueFalse:
        this.answers.clear();
        this.addAnswer(true);
        break;
    }
  }

  submit(){
    
  }
}
