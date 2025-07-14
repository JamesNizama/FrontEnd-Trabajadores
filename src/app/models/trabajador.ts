export class Trabajador {
    constructor(
        public id: number = 0,
        public tipoDocumento: string = '',
        public numeroDocumento: string = '',
        public nombres: string = '',
        public sexo: string = '',
        public idDepartamento: number = 0,
        public idProvincia: number = 0,
        public idDistrito: number = 0
    ) { }
}