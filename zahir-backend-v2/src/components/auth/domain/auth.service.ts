import { AuthRepository } from "../data-access/auth.repository";
import { JwtService } from "../../../shared/security/jwt.service";
import { PasswordService } from "../../../shared/security/password.service";
import { CreateUserDto } from "./auth.dto";

export class AuthService {
  private authRepository: AuthRepository;
  private passwordService: PasswordService;
  private jwtService: JwtService;

  constructor() {
    this.authRepository = new AuthRepository();
    this.passwordService = new PasswordService();
    this.jwtService = new JwtService();
  }

  async register(userData: CreateUserDto) {
    const passwordHash = await this.passwordService.hash(userData.password);

    const user = await this.authRepository.createUser({
      ...userData,
      password: passwordHash,
    });

    const { passwordHash: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
