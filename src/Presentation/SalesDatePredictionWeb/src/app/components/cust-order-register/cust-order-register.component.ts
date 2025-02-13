import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource ,MatTableModule} from '@angular/material/table';
import { OrderInterface } from '../../interface/OrderInterface';
import { salesDateRepository } from '../../repository/salesDateRepository';
import { MatPaginator ,MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-cust-order-register',
  imports: [MatDatepickerModule,MatSelectModule,MatInputModule,FormsModule ,ReactiveFormsModule,MatToolbarModule,MatProgressBarModule,MatFormFieldModule,CommonModule,MatPaginatorModule,MatTableModule,MatButton,MatDialogModule,MatIconModule,MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './cust-order-register.component.html',
  styleUrl: './cust-order-register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustOrderRegisterComponent implements AfterViewInit {
  @ViewChild('editCompanyModal') editCompanyModal!: TemplateRef<any>;
  private editCompanyDialogRef!: MatDialogRef<TemplateRef<any>>;
 title:string='';
 public orderForm !: FormGroup;
 displayedColumns: string[] = ['orderid', 'requireddate', 'shippeddate','shipname','shipaddress','shipcity'];
 dataSource!: MatTableDataSource<OrderInterface>;
 doWork:boolean=false;
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;
 produts:any=[];
 employees:any=[];
 shippers:any=[];
 constructor(private formBuilder: FormBuilder,@Inject(salesDateRepository)public salesDateRepo:salesDateRepository,public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
  this.orderForm = this.formBuilder.group({
     orderid: [0],
     custid: ['', Validators.required],
     empid: ['', Validators.required],
     orderdate: ['', Validators.required],
     requireddate: ['', Validators.required],
     shippeddate: ['', Validators.required],
     shipperid: ['', Validators.required],
     freight: ['', Validators.required],
     shipname: ['', Validators.required],
     shipaddress: ['', Validators.required],
     shipcity: ['', Validators.required],
     shipcountry: ['', Validators.required],
     productid: ['', Validators.required],
     unitprice: ['', Validators.required],
     qty: ['', Validators.required],
     discount: ['', Validators.required],
   });
 }
 openCompanyDetailsDialog(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.restoreFocus = false;
  dialogConfig.autoFocus = false;
  dialogConfig.role = 'dialog';

  this.editCompanyDialogRef = this.dialog.open(this.editCompanyModal, dialogConfig);

  this.editCompanyDialogRef.afterClosed().subscribe(result => {

  });
}

closeCompanyDetailsDialog() {
  this.editCompanyDialogRef.close();
}
  ngAfterViewInit() {
    this.title= this.data.custName as string;
    let custId= this.data.custId as number;
    this.orderForm.get('custid')?.setValue(custId);
    this.getEmployees();
    this.getShippers();
    this.getProduts();
  }
  getEmployees(){
    this.doWork=true;
    this.salesDateRepo.getData('employees/').subscribe({
      next: (res) => {
        this.doWork=false;
        this.employees=res;
    },
    error: (error) => {
      this.doWork=false;
    }});
  }
  getProduts(){
    this.doWork=true;
    let custId= this.data.custId as number;
    this.salesDateRepo.getData('products/').subscribe({
      next: (res) => {
        this.doWork=false;
        this.produts=res;
    },
    error: (error) => {
      this.doWork=false;
    }});
  }
  getShippers(){
    this.doWork=true;
    this.salesDateRepo.getData('shhippers/').subscribe({
      next: (res) => {
        this.doWork=false;
        this.shippers=res;
    },
    error: (error) => {
      this.doWork=false;
    }});
  }
  RegisterOrder(){
    this.doWork=true;
    let data={};
    Object.assign(data, this.orderForm.value);
    console.log(data);
    this.salesDateRepo.Save(data,'orders/').subscribe({
      next: (res) => {
        this.doWork=false;
      if(res!=null) {alert("¡Order register,succes!");
        let content2:HTMLElement= document.getElementById('closebtn') as HTMLElement;
        content2.click();
        this.orderForm.reset();
      }
      else  { alert("¡Order register,failed!");}
    },
    error: (error) => {
      this.doWork=false;
      alert("¡Order register,failed!");
    }});
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
