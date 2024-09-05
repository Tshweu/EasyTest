import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ManageQuestionsComponent } from './views/questions/manage-questions/manage-questions.component';
import { ViewQuestionComponent } from './views/questions/view-question/view-question.component';
import { CreateQuestionComponent } from './views/questions/create-question/create-question.component';
import { LoginComponent } from './login/login.component';
import { ViewsComponent } from './views/views.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'views',
    pathMatch: 'full'
  },
  {
    path: 'views',
    component: ViewsComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'questions/manage',
        component: ManageQuestionsComponent
      },
      {
        path: 'questions/create',
        component: CreateQuestionComponent
      },
      {
        path: 'questions/view/:id',
        component: ViewQuestionComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
