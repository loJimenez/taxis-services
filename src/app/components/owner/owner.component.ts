import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/model/owner.model';
import { OwnerService } from 'src/app/services/owner.services';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  owners: Owner[];
  owner : Owner ={
    nombre: '',
    apellido: '',
    telefono: 0,
  };

  ownerEdit : Owner ={
    nombre: '',
    apellido: '',
    telefono: 0,
  };

  id: String;
  // Creamos los nombres de la columna para la tabla
  displayedColumns: string[] = ['apellido', 'nombre', 'telefono', 'action'];
  // Fuente de datos
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("closeButton") closeButton: ElementRef;
  @ViewChild("closeButtonEdit") closeButtonEdit: ElementRef;
  

  constructor(private ownerService: OwnerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ownerService.getOwners().subscribe(
      owners => {
        // Del servicio de Titulares obtenemos los datos de los titulares y los cargamos en dataSource
        this.dataSource.data = owners;
        this.dataSource.paginator = this.paginator;
        this.owners = owners;                
      }
      
    )  
  }
// Add Owner
  onSubmit(form: NgForm){
    if(!form.valid){

    }else{      
      this.ownerService.addOwner(form.value);
      form.resetForm();
      this.closeModal();
    }
  }

  private closeModal(){
    this.closeButton.nativeElement.click();
  }

  private closeModalEdit(){
    this.closeButtonEdit.nativeElement.click();
  }

  // Edit Owner 
  editOwner(id: string){
    this.id = id;
    this.ownerService.getOwner(id).subscribe((owner: Owner) => {
      this.ownerEdit = owner;
    })
  }

  onSave(form: NgForm){
    if(!form.valid){

    }else{    
      form.value.id = this.id;
      this.ownerService.editOwner(form.value);      
      this.closeModalEdit();
    }
  }

  deleteOwner(){
    if(confirm('??Seguro que desea eliminar el Titula?')){
      this.ownerService.deleteOwner(this.ownerEdit);
    }
  }

}
