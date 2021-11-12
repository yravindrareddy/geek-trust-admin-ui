import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify ngOnInit', () => {
    spyOn(component,'calculatePages');
    component.ngOnInit();
    expect(component.calculatePages).toHaveBeenCalled();
  });

  it('should verify calculatePages', () => {
    component.totalRecords = 28;
    component.pageSize = 10;
    component.calculatePages();
    expect(component.calculatePages).toBeTruthy();
    expect(component.totalPages).toEqual(3);
    expect(component.pages.length).toEqual(3);
    expect(component.lastPage).toEqual(component.pages.pop());
  });

  it('should verify onPagination', () => {
    spyOn(component.pagination,'emit');
    component.onPagination(2);
    expect(component.onPagination).toBeTruthy();
    expect(component.selectedPage).toEqual(2);
    expect(component.pagination.emit).toHaveBeenCalledWith(2);
  });

  it('should verify onFirstPage', () => {
    spyOn(component.pagination,'emit');
    component.onFirstPage();
    expect(component.onFirstPage).toBeTruthy();
    expect(component.selectedPage).toEqual(1);
    expect(component.pagination.emit).toHaveBeenCalledWith(1);
  });

  it('should verify onLastPage', () => {
    component.lastPage = 5;
    spyOn(component.pagination,'emit');
    component.onLastPage();
    expect(component.onLastPage).toBeTruthy();
    expect(component.selectedPage).toEqual(5);
    expect(component.pagination.emit).toHaveBeenCalledWith(5);
  });

  it('should verify onPrevious', () => {
    component.selectedPage = 7;
    spyOn(component.pagination,'emit');
    component.onPrevious();
    expect(component.onPrevious).toBeTruthy();
    expect(component.selectedPage).toEqual(6);
    expect(component.pagination.emit).toHaveBeenCalledWith(6);
  });

  it('should verify onNext', () => {
    component.selectedPage = 3;
    component.lastPage = 8;
    spyOn(component.pagination,'emit');
    component.onNext();
    expect(component.onNext).toBeTruthy();
    expect(component.selectedPage).toEqual(4);
    expect(component.pagination.emit).toHaveBeenCalledWith(4);
  });

  it('should verify ngOnCHanges', () => {
    const changesObj: SimpleChanges = {
      totalRecords: new SimpleChange(10, 20,false),
    };
    spyOn(component,'calculatePages');
    component.ngOnChanges(changesObj);
    expect(component.ngOnChanges).toBeTruthy();  
    expect(component.calculatePages).toHaveBeenCalled();
  });

  
});
