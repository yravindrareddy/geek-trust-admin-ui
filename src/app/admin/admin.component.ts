import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { TableComponent } from './../table/table.component';
import { User } from './../user';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { columnDef, RenderType } from '../columnDef';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild(TableComponent) tableChild: TableComponent;
  searchInput: string;
  pageSize = 10;
  tableData: User[];
  dataSource: User[];
  selectedUser: User;
  columnnDefs: columnDef[] = [{
    title: 'select',
    column: 'select',
    renderType: RenderType.select
  },{
    title: 'Name',
    column: 'name',
    renderType: RenderType.text
  },{
    title: 'Email',
    column: 'email',
    renderType: RenderType.text
  },{
    title: 'Role',
    column: 'role',
    renderType: RenderType.text
  },{
    title: 'Actions',
    column: 'actions',
    renderType: RenderType.actions
  }];
  constructor(public http: HttpClient,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.get<User[]>('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').subscribe(data => {
      this.dataSource = data;
      this.tableData = data;      
    });
  }

  onSearch() {
    this.tableChild.selection.clear();    
    if(this.searchInput){
      const input = this.searchInput.toLowerCase();      
      this.tableData = this.dataSource.filter(data => {
        return data.name.toLowerCase().indexOf(input) >= 0 || data.email.toLowerCase().indexOf(input) >= 0 || data.role.toLowerCase().indexOf(input) >= 0;
      });
    } else {
      this.tableData = this.dataSource.slice();
    }
  }

  onEdit(user: User){
    this.selectedUser = user;
    this.openDialog(user);    
  }

  onDelete(user: User){
    this.selectedUser = user;
    const confirmMsg = 'Confirm to delete this record?';
    this.onDeleteConfirm(confirmMsg, false);    
  }

  onDeleteSelected() {
    const confirmMsg = 'Confirm to delete all selected recrods?';
    this.onDeleteConfirm(confirmMsg,true);
  }

  openDialog(user: User) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    dialogConfig.data = user;    
    
    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          if(data) {
            const idx = this.dataSource.findIndex(data => data.id === user.id);
            this.dataSource[idx].name = data.name;
            this.dataSource[idx].role = data.role;
            this.dataSource[idx].email = data.email;
            this.tableData = this.dataSource.slice();
          }
          this.selectedUser = null;
        }
    );    
  }

  onDeleteConfirm(confirmMsg: string, deleteSeletedAll: boolean) {
    const confirmDialog = new MatDialogConfig();

    confirmDialog.disableClose = true;
    confirmDialog.autoFocus = true;
    confirmDialog.width = '400px';

    confirmDialog.data = { confirmMessage: confirmMsg };    
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, confirmDialog);

    dialogRef.afterClosed().subscribe(
        data => {
          if(data) {
            if(deleteSeletedAll) {
              this.deleteSelected();
            } else {
              this.deleteSingleRecord();
            }
          }
          this.selectedUser = null;
        }
    );    
  }
  
  deleteSingleRecord() {
    const idx = this.dataSource.findIndex(data => data.id === this.selectedUser.id);
    this.dataSource.splice(idx,1);
    this.tableData = this.dataSource.slice();
  }

  deleteSelected() {
    const selectedUserIds = this.tableChild.selection.selected.map(user => user.id);
    this.dataSource = this.dataSource.filter(user => !selectedUserIds.includes(user.id));
    this.tableData = this.dataSource.slice();
    this.tableChild.selection.clear();
  }

}
