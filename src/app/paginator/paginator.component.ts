import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() totalRecords: number;
  @Input() pageSize: number;
  @Output() pagination = new EventEmitter(); 
  pages: number[] = [];
  totalPages: number;
  selectedPage = 1;
  lastPage: number;
  constructor() { }

  ngOnInit(): void {
    this.calculatePages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['totalRecords'].currentValue) {
      this.calculatePages();
    }
  }

  calculatePages(){
    if(this.totalRecords) {      
      this.totalPages = Math.ceil(this.totalRecords/this.pageSize);
      this.pages = [...Array(this.totalPages).keys()].map(n => n+1);
      this.selectedPage = 1;
      this.lastPage = this.pages.slice().pop();
    }
  }

  onPagination(page: number) {
    this.selectedPage = page;
    this.pagination.emit(this.selectedPage);
  }

  onFirstPage() {
    this.selectedPage = 1;
    this.pagination.emit(this.selectedPage);
  }

  onLastPage() {
    this.selectedPage = this.lastPage;
    this.pagination.emit(this.selectedPage);
  }

  onPrevious() {
    if(this.selectedPage > 1) {
      this.selectedPage -= 1;
      this.pagination.emit(this.selectedPage);
    }
  }
   
  onNext() {
    if(this.selectedPage < this.lastPage) {
      this.selectedPage += 1;
      this.pagination.emit(this.selectedPage);
    }
  }

}
