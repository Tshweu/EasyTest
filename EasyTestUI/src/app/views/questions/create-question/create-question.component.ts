import { Component } from '@angular/core';
import { QuestionFormComponent } from "../../../components/forms/question-form/question-form.component";

@Component({
  selector: 'app-create-question',
  standalone: true,
  imports: [QuestionFormComponent],
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.scss'
})
export class CreateQuestionComponent {

}
