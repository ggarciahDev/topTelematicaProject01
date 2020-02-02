import { Component, OnInit } from '@angular/core';
import { MedidaService } from '../../services/medida.service';
import { NgForm } from '@angular/forms';
import { Medida } from 'src/app/models/medida';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.component.html',
  styleUrls: ['./medidas.component.css'],
  providers: [MedidaService]
})
export class MedidasComponent implements OnInit {
  tempPromedio;

  constructor(private medidaService: MedidaService) { }

  ngOnInit() {
    this.getMedidas();
    //this.tempPromedio = this.calcTempProm(this.medidaService.medidas);
  }

  calcTempProm(medidas: Medida[]){
    var tempProm = 0;
    var nDatos = 0;

    console.log(medidas);

    for(let medida of medidas){
      tempProm += medida.temp;
      nDatos++;
    }

    tempProm = tempProm / nDatos;
    
    return tempProm;
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.medidaService.selectedMedida = new Medida();
    }
  }

  addMedida(form: NgForm){
    if(form.value._id){
      this.medidaService.putMedida(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getMedidas();
        });
    }else{
      this.medidaService.postMedida(form.value)
      .subscribe( res => {
        this.resetForm(form);
        this.getMedidas();
      });
    }
    
  }

  editMedida(medida: Medida){
    this.medidaService.selectedMedida = medida; //Esto llena los campos
  }

  deleteMedida(_id: string){
    if(confirm('¿Eliminar medida?')){
      this.medidaService.deleteMedida(_id)
      .subscribe(res => {
        this.getMedidas();
      });
    }
  }

  getMedidas(){
    this.medidaService.getMedidas()
      .subscribe(res => {
        this.medidaService.medidas = res as Medida[];
      });
  }

}
