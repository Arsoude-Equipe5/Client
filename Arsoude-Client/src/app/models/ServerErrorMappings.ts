export class ServerErrorMappings {
    private static errorKeys: Record<string, string> = {
      "Passwords do not match.": "register.passwordMatching",
      "Email already in use.": "register.emailInUse",
      "FirstName is too short.": "register.firstName2car",
      "FirstName is too long.": "register.firstName40car",
      "LastName is too short.": "register.lastName2car",
      "LastName is too long.": "register.lastName40car",
      "BirthDate is not valid.": "register.invalidBirth",
      "PostalCode is not valid.": "register.invalidPostalCode",
      "Invalid username or password.": "signin.invalidLogin"
    };
  
    static getLocalizationKey(serverErrorMessage: string): string {
      return this.errorKeys[serverErrorMessage] || "register.unexpectedError";
    }
  }
  
