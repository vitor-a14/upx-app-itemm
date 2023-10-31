export class IButtonsMode{ //isso simula uma interface ja que no js nao tem 
        constructor() {
          if (this.constructor === IButtonsMode) {
            throw new Error("Não é possível instanciar uma interface.");
          }
        }
        /**
         * 
         * @param {any} student 
         * @param {Function} navigator 
         */
        execute_mode_funtion(student, navigator) {
          throw new Error("Método deve ser implementado.");
        }

}