import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditStdComponent } from '../add-edit-std/add-edit-std.component';
import { ServiceService } from '../shared/service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 
  'fathername','email','dob', 'gen', 'qual','uniname',
'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private service: ServiceService) { }
  
  ngOnInit(): void {
  this.getStdlist();
  }

  openAddEditStdForm() {
   const dialogRef= this.dialog.open(AddEditStdComponent);//refersh data from the table
   dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getStdlist();
      }
    }
   })
  }
  editstdform(data:any){
    const dialogRef= this.dialog.open(AddEditStdComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getStdlist();
      }
    }
   })

  }

  getStdlist() {
    this.service.getAllStudent().subscribe({ 
      next: (res) => {
        this.dataSource.data = res; // Use dataSource.data to set the data
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deletstd(id:number){
    this.service.deletstudent(id).subscribe({
      next:(res)=>{
        alert("Student data deleted succesful 😒!")
        this.getStdlist();//for auto referesh data
      },
      error: console.log,
      
    })

  }
}
