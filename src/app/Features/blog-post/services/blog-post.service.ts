import { Injectable } from '@angular/core';
import { AddBlogpost } from '../models/add-blogpost.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { UpdateBlogpost } from '../models/update-blogpost.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http:HttpClient) { }

  createBlogPost(data:AddBlogpost):Observable<BlogPost>{
    return this.http.post<BlogPost>(`${environment.apiUrl}/blogpost`,data);
  }

  getAllBlogPosts():Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${environment.apiUrl}/blogpost`);
  }
  getBlogPostById(id:string):Observable<BlogPost>{
    return this.http.get<BlogPost>(`${environment.apiUrl}/blogpost/${id}`);
  }
  updateBlogPost(id:string, updateBlogPost:UpdateBlogpost):Observable<BlogPost>{
    return this.http.put<BlogPost>(`${environment.apiUrl}/blogpost/${id}`,updateBlogPost);
  }
}
