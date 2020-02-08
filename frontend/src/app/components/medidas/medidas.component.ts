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
  humPromedio;
  nSensores;

  constructor(private medidaService: MedidaService) { }

  ngOnInit() {
    this.getMedidas();
  }

  calcPromedios(){
    let medidas = this.medidaService.medidas;
    this.tempPromedio = 0;
    this.humPromedio = 0;
    this.nSensores = 0;

    for(let medida of medidas){
      this.tempPromedio += medida.temp;
      this.humPromedio += medida.hum;

      this.nSensores++;
    }

    this.tempPromedio = this.tempPromedio / this.nSensores;
    this.humPromedio = this.humPromedio / this.nSensores;
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
