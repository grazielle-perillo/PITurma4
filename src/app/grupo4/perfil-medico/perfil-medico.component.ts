import { Component, OnInit } from '@angular/core';
import { PerfilmedicoService } from './perfilmedico.service'
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfilMedico} from './perfilmedico.model';

@Component({
  selector: 'app-perfil-medico',
  templateUrl: './perfil-medico.component.html',
  styleUrls: ['./perfil-medico.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class PerfilMedicoComponent implements OnInit {

  constructor(
    private perfilService : PerfilmedicoService,
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router){
    config.backdrop = 'static';
    config.keyboard = false;
  }

  id: String;
  dadosRetorno : any
  
  request : any = {

    medico : {
    
      espMed: {
          idEspMed: null
      },
      ufCrm: {
          idUf: null 
      },
      nome: '',
      dtNascimento: null,
      nrCpf: '',
      nrCrm: '',
      preco: {
          vlConsulta: null
      },
      enderecos: [
          {
              cidade: {
                  idCidade: null,
                  uf: {
                      idUf: null
                  }
              },
              dsComplemento: '',
              dsEndereco: '',
              dsBairro: '',
              nrCep: ''
          }
      ],
      contatos: [
          {
              dsContato: ''
          }
      ]
  },
 
    ufs : [
        {
          idUf :  null,
          dsUf : ''
        }
    ],

    especialidades : [

    ],

    cidades: [

    ],

    email : {
      
    }

}

  open(content) {
    this.modalService.open(content);
  }
  
  ngOnInit(): void {
    this.getDadosPerfil();
    this.id = this.route.snapshot.paramMap.get('id');
  }

   getDadosPerfil(){
    this.perfilService.getDadosPerfil().subscribe(
      retorno => {
        this.request = retorno;
        console.log(retorno);
      }
    )
  }

  atualizar(){
    console.log("dados p atualizar", this.request)
    this.perfilService.updatePerfil(this.id, this.request.medico).subscribe(
      (response) => {


        alert('Perfil atualizado com sucesso');
        this.router.navigate(['perfil/medico']);
        
      },
      (error) => {
        console.log(this.request);
        alert('algo inesperado aconteceu');
      }
    )
  }
}