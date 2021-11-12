import { HttpClientModule } from '@angular/common/http';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RenderType } from '../columnDef';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.tableData = [
      {
          "id": "1",
          "name": "Aaron Miles",
          "email": "aaron@mailinator.com",
          "role": "member"
      },
      {
          "id": "2",
          "name": "Aishwarya Naik",
          "email": "aishwarya@mailinator.com",
          "role": "member"
      }];
    component.columnDefs = [{
      title: 'select',
      column: 'select',
      renderType: RenderType.select
    },{
      title: 'Name',
      column: 'name',
      renderType: RenderType.text
    }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify ngOnInit', () => {
    spyOn(component,'setTableData');
    expect(component.ngOnInit).toBeTruthy();
    component.ngOnInit();
    expect(component.setTableData).toHaveBeenCalled();
    expect(component.displayedColumns).toBeDefined();
    expect(component.displayedColumns.length).toEqual(2);
  });

  it('should verify setTableData', () => {
    component.pageSize = 10;
    expect(component.setTableData).toBeTruthy();
    component.setTableData();
    expect(component.dataSource.data).toBeDefined();
    expect(component.dataSource.data.length).toEqual(2);
    expect(component.totalRecords).toEqual(2);
  });

  it('should verify onPagination - Page 1', () => {
    component.pageSize = 10;
    spyOn(component.selection,'clear');
    expect(component.onPagination).toBeTruthy();
    component.onPagination(1);
    expect(component.dataSource.data).toBeDefined();
    expect(component.dataSource.data.length).toEqual(2);    
  });

  it('should verify onPagination - Page > 1', () => {
    component.pageSize = 10;
    spyOn(component.selection,'clear');
    expect(component.onPagination).toBeTruthy();
    component.onPagination(2);
    expect(component.dataSource.data).toBeDefined();
    expect(component.dataSource.data.length).toEqual(0);    
  });

  it('should verify onEdit', () => {
    const rowObj = { id: 1, name: 'test', email: 'test@mail.com', role: 'member' };
    spyOn(component.editRecord,'emit');
    expect(component.onEdit).toBeTruthy();
    component.onEdit(rowObj);    
    expect(component.editRecord.emit).toHaveBeenCalledWith(rowObj);    
  });

  it('should verify onDelete', () => {
    const rowObj = { id: 1, name: 'test', email: 'test@mail.com', role: 'member' };
    spyOn(component.deleteRecord,'emit');
    expect(component.onDelete).toBeTruthy();
    component.onDelete(rowObj);    
    expect(component.deleteRecord.emit).toHaveBeenCalledWith(rowObj);    
  });

  it('should verify isAllSelected', () => {
    component.dataSource.data.length = 1;
    component.selection.selected.length = 1;   
    expect(component.isAllSelected).toBeTruthy();
    const output = component.isAllSelected();    
    expect(output).toBeTruthy();
  });

  it('should verify masterToggle', () => {
    spyOn(component,'isAllSelected').and.returnValue(true);
    spyOn(component.selection,'clear');
    component.masterToggle();
    fixture.detectChanges();    
    expect(component.masterToggle).toBeTruthy();
    expect(component.selection.clear).toHaveBeenCalled();
  });
  
  it('should verify ngOnCHanges', () => {
    const changesObj: SimpleChanges = {
      tableData: new SimpleChange([{ id: 1, name: 'test'}], [{ id: 2, name: 'test1' }],false),
    };
    spyOn(component,'setTableData');
    component.ngOnChanges(changesObj);
    expect(component.ngOnChanges).toBeTruthy();  
    expect(component.setTableData).toHaveBeenCalled();
  });
});
