import { User } from './../user';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogComponent } from './edit-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;
  let data: User = { id: 1, name: 'string', role: 'member', email: 'test@email.com'};
  const formBuilder = new FormBuilder();
  const dialogMock = {
    close: () => { }
    };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDialogComponent ],
      imports: [MatDialogModule, ReactiveFormsModule, FormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      providers: [MatDialog, {provide: MatDialogRef, useValue: dialogMock},  { provide: MAT_DIALOG_DATA,  useValue: data }, 
        { provide: FormBuilder,  useValue: formBuilder }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify close', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    expect(component.close).toBeTruthy();
    component.close();
    expect(spy).toHaveBeenCalled();
  });

  it('should verify save', () => {
    component.form.controls['name'].setValue('name');
    component.form.controls['email'].setValue('test@email.com');
    component.form.controls['role'].setValue('member');
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    expect(component.close).toBeTruthy();
    component.save();
    expect(spy).toHaveBeenCalled();
  });
});
