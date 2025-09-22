import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Core/Components/navbar/navbar.component';
import { CategoryListComponent } from './Features/Category/category-list/category-list.component';
import { AddCategoryComponent } from './Features/Category/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { EditCategoryComponent } from './Features/Category/edit-category/edit-category.component';
import { AddBlogpostComponent } from './Features/blog-post/add-blogpost/add-blogpost.component';
import { BlogpostListComponent } from './Features/blog-post/blogpost-list/blogpost-list.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddBlogpostComponent,
    BlogpostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    provideClientHydration(),
     provideHttpClient(
    withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
