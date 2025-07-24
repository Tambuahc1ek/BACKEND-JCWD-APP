import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateBody } from '../../middlewares/validate.middleware';
import { RegisterDTO } from './dto/register.dto'; // Assuming you have a DTO for registration
import { LoginDto } from './dto/login.dto';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/register',
      validateBody(RegisterDTO),
      this.authController.register
    );
    // Add other routes as needed
    this.router.post(
      '/login',
      validateBody(LoginDto),
      this.authController.login
    );
    // Add other routes as needed
  }

  getRouter() {
    return this.router;
  }
}
