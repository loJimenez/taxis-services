import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Owner } from 'src/app/model/owner.model';
import { OwnerService } from 'src/app/services/owner.services';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  owners: Owner[];
  // Creamos los nombres de la columna para la tabla
  displayedColumns: string[] = ['apellido', 'nombre', 'telefono', 'action'];
  // Fuente de datos
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  nfAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  constructor(private ownerService: OwnerService) { }

  ngOnInit(): void {
    this.ownerService.getOwners().subscribe(
      owners => {
        // Del servicio de Titulares obtenemos los datos de los titulares y los cargamos en dataSource
        this.dataSource.data = owners;
        this.owners = owners;                
      }
      
    )  
  }

}
