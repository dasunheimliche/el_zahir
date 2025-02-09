import bcrypt from "bcrypt";

export class PasswordService {
  private readonly saltRounds: number;
  private readonly pepper: string;

  constructor() {
    this.saltRounds = parseInt(process.env.SALT_ROUNDS || "12", 10);
    this.pepper = process.env.PASSWORD_PEPPER || "default-pepper-value";
  }

  async hash(password: string): Promise<string> {
    try {
      const pepperedPassword = this.addPepper(password);

      const hash = await bcrypt.hash(pepperedPassword, this.saltRounds);

      return hash;
    } catch (error) {
      console.error("Error hashing password:", error);
      throw new Error("Error processing password");
    }
  }

  async verify(password: string, hash: string): Promise<boolean> {
    try {
      const pepperedPassword = this.addPepper(password);

      const isValid = await bcrypt.compare(pepperedPassword, hash);

      return isValid;
    } catch (error) {
      console.error("Error verifying password:", error);
      throw new Error("Error verifying password");
    }
  }

  validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  generateTemporaryPassword(length: number = 12): string {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";

    password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]; // minúscula
    password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]; // mayúscula
    password += "0123456789"[Math.floor(Math.random() * 10)]; // número
    password += "!@#$%^&*"[Math.floor(Math.random() * 8)]; // especial

    for (let i = password.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  private addPepper(password: string): string {
    return `${password}${this.pepper}`;
  }
}
