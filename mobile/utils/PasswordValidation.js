export function isValidPassword(password) {
    // Define the regular expression pattern for password validation
    // This example enforces the following rules:
    // - At least 8 characters
    // - Contains at least one uppercase letter
    // - Contains at least one lowercase letter
    // - Contains at least one digit
    // - Contains at least one special character (!@#$%^&*()-_=+[]{}|;:'",.<>?/)
    var pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-_=+[\]{}|;:'",.<>?/]).{6,}$/;
  
    // Use the test() method of the RegExp object to check if the password matches the pattern
    return pattern.test(password);
  }