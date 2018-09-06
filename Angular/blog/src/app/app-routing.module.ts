import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';

const routes: Routes = [
  /*
  {path: '', component: PostListComponent, children:[
    {path: 'post/:id', component: PostDetailComponent}
  ]}
  */
  
  {path: '', component: PostListComponent},
  {path: 'post/:id', component: PostDetailComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
