import { TableComponent } from './../table/table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponent, TableComponent ],
      imports: [HttpClientModule, MatDialogModule],
      providers: [HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {    
    expect(component).toBeTruthy();
  });

  it('should verify onEdit', () => {
    const user = { id: 1, name: 'test', email: 'test@mail.com', role: 'member' };
    spyOn(component,'openDialog');
    expect(component.onEdit).toBeTruthy();
    component.onEdit(user);
    expect(component.selectedUser).toEqual(user);
    expect(component.openDialog).toHaveBeenCalledWith(user);
  });

  it('should verify onDelete', () => {
    const user = { id: 1, name: 'test', email: 'test@mail.com', role: 'member' };
    spyOn(component,'onDeleteConfirm');
    expect(component.onDelete).toBeTruthy();
    component.onDelete(user);
    expect(component.selectedUser).toEqual(user);
    expect(component.onDeleteConfirm).toHaveBeenCalled();
  });

  it('should verify onDeleteSelected', () => {    
    spyOn(component,'onDeleteConfirm');
    expect(component.onDeleteSelected).toBeTruthy();
    component.onDeleteSelected();    
    expect(component.onDeleteConfirm).toHaveBeenCalled();
  });

  it('should verify onSearch - no input', () => {
    component.searchInput = '';
    component.dataSource = [{ id: 1, name: 'test', email: 'test@mail.com', role: 'member' }];
    spyOn(component.tableChild.selection,'clear');
    expect(component.onSearch).toBeTruthy();
    component.onSearch();    
    expect(component.tableChild.selection.clear).toHaveBeenCalled();
  });

  it('should verify onSearch - with input', () => {
    component.searchInput = 'member';
    component.dataSource = [{ id: 1, name: 'test', email: 'test@mail.com', role: 'member' }, { id: 2, name: 'test1', email: 'test1@mail.com', role: 'admin' }];
    spyOn(component.tableChild.selection,'clear');
    expect(component.onSearch).toBeTruthy();
    component.onSearch();    
    expect(component.tableChild.selection.clear).toHaveBeenCalled();
    expect(component.tableData.length).toEqual(1);
  });
 
  it('should verify deleteSingleRecord', () => {
    component.selectedUser = { id: 1, name: 'test', email: 'test@mail.com', role: 'member' };
    component.dataSource = [{ id: 1, name: 'test', email: 'test@mail.com', role: 'member' }, { id: 2, name: 'test1', email: 'test1@mail.com', role: 'admin' }];
    spyOn(component.dataSource,'splice');
    expect(component.deleteSingleRecord).toBeTruthy();
    component.deleteSingleRecord();    
    expect(component.dataSource.splice).toHaveBeenCalled();    
  });

  it('should verify deleteSelected', () => {
    //component.tableChild.selection.selected = { id: 1, name: 'test', email: 'test@mail.com', role: 'member' };
    component.dataSource = [{ id: 1, name: 'test', email: 'test@mail.com', role: 'member' }, { id: 2, name: 'test1', email: 'test1@mail.com', role: 'admin' }];
    spyOn(component.tableChild.selection,'clear');
    expect(component.deleteSelected).toBeTruthy();
    component.deleteSelected();    
    expect(component.tableChild.selection.clear).toHaveBeenCalled();  
  });

  

});
