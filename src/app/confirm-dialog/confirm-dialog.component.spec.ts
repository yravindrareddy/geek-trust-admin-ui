import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let data = { confirmMessage: 'Confirm delete'};
  const dialogMock = {
    close: () => { }
    };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponent ],
      imports:[ MatDialogModule ],
      providers: [MatDialog, {provide: MatDialogRef, useValue: dialogMock},  { provide: MAT_DIALOG_DATA,  useValue: data }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify onconfirm', () => {   
    let spy = spyOn(component.dialogRef, 'close').and.callThrough(); 
    expect(component.onConfirm).toBeTruthy();
    component.onConfirm();
    expect(spy).toHaveBeenCalled();
  });

  it('should verify oncCancel', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    expect(component.onCancel).toBeTruthy();
    component.onCancel();
    expect(spy).toHaveBeenCalled();
  });
});
