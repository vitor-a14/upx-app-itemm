export class ButtonSettingsMode{
        constructor() {
          if (this.constructor === ButtonSettingsMode) {
            throw new Error("Não é possível instanciar uma interface.");
          }
        }
        // Defina os métodos que devem ser implementados por classes que implementam esta "interface"
        execute_mode_funtion(student) {
          throw new Error("Método deve ser implementado.");
        }

}