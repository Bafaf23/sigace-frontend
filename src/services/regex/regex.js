/**
 * Patrones de validación para el formulario de registro de usuarios.
 * @typedef {Object} patterns
 * @property {titelp} email - Patrón de validación para el correo electrónico.
 * @property {titelp} password - Patrón de validación para la contraseña.
 * @property {titelp} name - Patrón de validación para el nombre.
 * @property {titelp} lastName - Patrón de validación para el apellido.
 * @property {titelp} dni - Patrón de validación para el número de documento.
 * @property {titelp} phone - Patrón de validación para el teléfono.
 * @property {titelp} address - Patrón de validación para la dirección.
 */
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  name: /^[a-zA-Z]+( [a-zA-Z]+)*$/,
  lastName: /^[a-zA-Z]+( [a-zA-Z]+)*$/,
  dni: /^[0-9]{8}$/,
  phone: /^0(412|414|416|424|426)\d{7}$/,
  address: /^[a-zA-Z0-9\s]+$/,
  sig: /^(SIG)[0-9]{4}$/,
};

/**
 * Valida un valor contra un patrón de validación.
 * @param {titelp} pattern - Patrón de validación.
 * @param {string} value - Valor a validar.
 * @returns {boolean} true si el valor es válido, false en caso contrario.
 */
export const validate = (pattern, value) => {
  return pattern.test(value);
};
