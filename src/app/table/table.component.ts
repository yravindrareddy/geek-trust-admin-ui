import { columnDef, RenderType } from './../columnDef';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() columnDefs: columnDef[];
  @Input() pageSize: number;
  @Input() tableData: any;
  @Output() editRecord = new EventEmitter();
  @Output() deleteRecord = new EventEmitter();  
  dataSource = new MatTableDataSource<any>([]);
  
  displayedColumns: string[];
  selection = new SelectionModel<any>(true, []);
  totalRecords: number;

  public get renderTypes(): typeof RenderType {
    return RenderType; 
  }

  constructor(public http: HttpClient) { }

  
  ngOnInit(): void {
    if(this.tableData){
      this.setTableData();
    }
    this.displayedColumns = this.columnDefs.map(colDef => colDef.column);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['tableData'].currentValue !== changes['tableData'].previousValue){
      this.setTableData();
    }
  }

  ngAfterViewInit(): void {
    
  }

  setTableData(){
    this.dataSource.data = this.tableData.slice(0,this.pageSize);
    this.totalRecords = this.tableData.length;
  }  

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  onPagination(pageNo: any) {
    this.selection.clear();
    let start = 0;
    let end = this.pageSize;
    if(pageNo !== 1) {
      start = (pageNo-1)*this.pageSize;
      end =  (pageNo)*this.pageSize;
    }
    this.dataSource.data = this.tableData.slice(start,end);
  }

  onEdit(rowObj : any) {
    this.editRecord.emit(rowObj);
  }

  onDelete(rowObj : any) {
    this.deleteRecord.emit(rowObj);
  }

}
