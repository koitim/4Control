export function validateEmail(email) {
    return (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/).test(email);
  }
  
  export function validatePassword(password) {
    return !(password == null || password.trim() == "");
  }
  
  export function validatePasswordConfirmation(password, passwordConfirmation) {
    return password === passwordConfirmation;
  }