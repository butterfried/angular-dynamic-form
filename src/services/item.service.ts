import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/index";
import { ApiResponse } from "../model/api.response";
import { Item } from 'src/model/item';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://127.0.0.1:8000/api/items';

  getItems(id: any) : Observable<ApiResponse<Item[]>> {
    return this.http.get<ApiResponse<Item[]>>(this.baseUrl + (id ? '/' + id : ''));
  }

  createItem(id: any,item: Item): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.baseUrl + (id ? '/' + id : ''), item);
  }

  updateItem(item: Item): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(this.baseUrl + '/' +  item.id, item);
  }

  deleteItem(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.baseUrl + '/' + id);
  }
}