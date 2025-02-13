import { Component ,AfterViewInit,ViewChild, Inject, inject, ChangeDetectionStrategy} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {nextPredictedOrderInterface} from '../app/interface/nextPredictedOrderInterface';
import {salesDateRepository} from '../app/repository/salesDateRepository';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { CustOrdersComponentComponent } from '../app/components/cust-orders-component/cust-orders-component.component';
import { CustOrderRegisterComponent } from '../app/components/cust-order-register/cust-order-register.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatToolbarModule,CommonModule,MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent  implements AfterViewInit{
  title = 'SalesDatePredictionWeb';
  doWork:boolean=false;
  displayedColumns: string[] = ['customerName', 'lastOrderDate', 'nextPredictedOrderDate','actions'];
  dataSource!: MatTableDataSource<nextPredictedOrderInterface>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly dialog = inject(MatDialog);
  constructor (@Inject(salesDateRepository)public salesDateRepo:salesDateRepository) {
  }
  ngAfterViewInit() {
    this.doWork=true;
    this.salesDateRepo.getData('orders').subscribe({
      next: (res) => {
        this.doWork=false;
        let responseData= res as nextPredictedOrderInterface[];
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

  showCustOrdersDialog(custId:number,custName:string) {
    const dialogRef = this.dialog.open(CustOrdersComponentComponent, {
      maxWidth: '100vw',
      maxHeight: '150vw',
      data:{
        custId:custId,
        custName:custName
      }
    });
  }
  showCustRegisterOrdersDialog(custId:number,custName:string) {
    const dialogRef = this.dialog.open(CustOrderRegisterComponent, {
      maxWidth: '100vw',
      maxHeight: '150vw',
      data:{
        custId:custId,
        custName:custName
      }
    });
  }
}
