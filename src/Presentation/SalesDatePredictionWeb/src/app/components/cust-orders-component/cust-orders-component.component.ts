import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
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
@Component({
  selector: 'app-cust-orders-component',
  imports: [MatToolbarModule,MatProgressBarModule,MatFormFieldModule,CommonModule,MatPaginatorModule,MatTableModule,MatButton,MatDialogModule,MatIconModule,MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './cust-orders-component.component.html',
  styleUrl: './cust-orders-component.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustOrdersComponentComponent implements AfterViewInit {
  @ViewChild('editCompanyModal') editCompanyModal!: TemplateRef<any>;
  private editCompanyDialogRef!: MatDialogRef<TemplateRef<any>>;
 title:string='';
 displayedColumns: string[] = ['orderid', 'requireddate', 'shippeddate','shipname','shipaddress','shipcity'];
 dataSource!: MatTableDataSource<OrderInterface>;
 doWork:boolean=false;
 @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
 constructor(@Inject(salesDateRepository)public salesDateRepo:salesDateRepository,public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {}
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
    this.doWork=true;
    let custId= this.data.custId as number;
    this.salesDateRepo.getData('orders/GetByCustomer/'+ custId).subscribe({
      next: (res) => {
        this.doWork=false;
        let responseData= res as OrderInterface[];
        console.log(responseData);
        this.dataSource= new MatTableDataSource(responseData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    },
    error: (error) => {
      this.doWork=false;
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
