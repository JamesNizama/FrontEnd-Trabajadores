import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/models/departamento';
import { Distrito } from 'src/app/models/distrito';
import { Provincia } from 'src/app/models/provincia';
import { Trabajador } from 'src/app/models/trabajador';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {
  trabajador: Trabajador[] = [];
  departamento: Departamento[] = [];
  distrito: Distrito[] = [];
  provincia: Provincia[] = [];

  provinciasFiltradas: Provincia[] = [];
  distritosFiltrados: Distrito[] = [];

  trabajadorPaginado: Trabajador[] = [];
  paginaActual = 1;
  itemsPorPagina = 5;
  filtroSexo: string = '';


  trabajadorForm: Trabajador = {
    id: 0,
    tipoDocumento: '',
    numeroDocumento: '',
    nombres: '',
    sexo: '',
    idDepartamento: 0,
    idProvincia: 0,
    idDistrito: 0
  };

  constructor(private trabajadorService: TrabajadorService,
    private departamentoService: DepartamentoService,
    private distritoService: DistritoService,
    private provinciaService: ProvinciaService
  ) { }

  ngOnInit(): void {
    this.obtenerTrabajadores();
    this.obtenerDepartamentos();
    this.obtenerProvincias();
    this.obtenerDistritos();
  }

  resetForm(): void {
    this.trabajadorForm = {
      id: 0,
      tipoDocumento: '',
      numeroDocumento: '',
      nombres: '',
      sexo: '',
      idDepartamento: 0,
      idProvincia: 0,
      idDistrito: 0
    };
    this.provinciasFiltradas = [];
    this.distritosFiltrados = [];
  }

  totalPaginas(): number[] {
    const total = Math.ceil(this.trabajador.length / this.itemsPorPagina);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  aplicarFiltro(): void {
    this.paginaActual = 1;
    this.paginarTrabajadores();
  }

  paginarTrabajadores(): void {
    let listaFiltrada = this.trabajador;

    if (this.filtroSexo) {
      listaFiltrada = listaFiltrada.filter(t => t.sexo === this.filtroSexo);
    }

    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.trabajadorPaginado = listaFiltrada.slice(inicio, fin);
  }


  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.paginarTrabajadores();
  }

  getNombreDepartamento(id: number): string {
    const depto = this.departamento.find(d => d.id === id);
    return depto ? depto.nombreDepartamento : '';
  }

  getNombreProvincia(id: number): string {
    const prov = this.provincia.find(p => p.id === id);
    return prov ? prov.nombreProvincia : '';
  }

  getNombreDistrito(id: number): string {
    const dist = this.distrito.find(d => d.id === id);
    return dist ? dist.nombreDistrito : '';
  }

  obtenerTrabajadores(): void {
    this.trabajadorService.getTrabajadores().subscribe({
      next: (data) => {
        this.trabajador = data;
        this.paginarTrabajadores();
        console.log('Sexo de cada trabajador:', this.trabajador.map(t => t.sexo));

      },
      error: (err) => {
        console.error('Error al obtener trabajadores:', err);
      }
    });
  }

  obtenerDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamento = data;
      },
      error: (err) => {
        console.error('Error al obtener departamentos:', err);
      }
    });
  }

  obtenerProvincias(): void {
    this.provinciaService.getProvincias().subscribe({
      next: (data) => {
        this.provincia = data;
      },
      error: (err) => {
        console.error('Error al obtener provincias:', err);
      }
    });
  }

  obtenerDistritos(): void {
    this.distritoService.getDistritos().subscribe({
      next: (data) => {
        this.distrito = data;
      },
      error: (err) => {
        console.error('Error al obtener distritos:', err);
      }
    });
  }

  filtrarProvincias(): void {
    this.provinciasFiltradas = this.provincia.filter(
      p => p.idDepartamento === +this.trabajadorForm.idDepartamento
    );
    this.trabajadorForm.idProvincia = 0;
    this.distritosFiltrados = [];
    this.trabajadorForm.idDistrito = 0;
  }

  filtrarDistritos(): void {
    this.distritosFiltrados = this.distrito.filter(
      d => d.idProvincia === +this.trabajadorForm.idProvincia
    );
    this.trabajadorForm.idDistrito = 0;
  }

  abrirModalEditar(trabajador: Trabajador): void {
    this.trabajadorForm = { ...trabajador };
    this.provinciasFiltradas = this.provincia.filter(
      p => p.idDepartamento === +this.trabajadorForm.idDepartamento
    );

    this.distritosFiltrados = this.distrito.filter(
      d => d.idProvincia === +this.trabajadorForm.idProvincia
    );
  }

  registrarTrabajador(): void {
    if (!this.trabajadorForm.tipoDocumento ||
      !this.trabajadorForm.numeroDocumento ||
      !this.trabajadorForm.nombres) {
      Swal.fire({
        title: 'Campos requeridos',
        text: 'Por favor complete los campos obligatorios.',
        icon: 'warning',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    this.trabajadorService.crearTrabajador(this.trabajadorForm).subscribe({
      next: (res) => {
        this.obtenerTrabajadores();
        this.resetForm();

        const modal = document.getElementById('modalTrabajador');
        if (modal) {
          (modal as any).classList.remove('show');
          (modal as any).style.display = 'none';
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) backdrop.remove();
        }

        Swal.fire({
          title: 'Registrado',
          text: 'El trabajador ha sido registrado exitosamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Error al registrar trabajador:', err);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al registrar el trabajador.',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }

  actualizarTrabajador(): void {
    if (!this.trabajadorForm.tipoDocumento ||
      !this.trabajadorForm.numeroDocumento ||
      !this.trabajadorForm.nombres) {
      Swal.fire({
        title: 'Campos requeridos',
        text: 'Por favor complete los campos obligatorios.',
        icon: 'warning',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    this.trabajadorService.actualizarTrabajador(this.trabajadorForm).subscribe({
      next: (res) => {
        this.obtenerTrabajadores();
        this.resetForm();

        const modal = document.getElementById('modalEditarTrabajador');
        if (modal) {
          (modal as any).classList.remove('show');
          (modal as any).style.display = 'none';
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) backdrop.remove();
        }

        Swal.fire({
          title: 'Actualizado',
          text: 'El trabajador ha sido actualizado exitosamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Error al actualizar trabajador:', err);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al actualizar el trabajador.',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }

  eliminarTrabajador(trabajador: Trabajador): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al trabajador de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.trabajadorService.eliminarTrabajador(trabajador).subscribe({
          next: () => {
            this.obtenerTrabajadores();
            Swal.fire({
              title: 'Eliminado',
              text: 'El trabajador ha sido eliminado.',
              icon: 'success',
              timer: 1000,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('Error al eliminar trabajador:', err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el trabajador.',
              icon: 'error',
              timer: 1500,
              showConfirmButton: false
            });
          }
        });
      }
    });
  }

}
