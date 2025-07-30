import { Router } from "express";
import { BlogController } from "./blog.controller";
export class BlogRouter {
  private router: Router;
  private sampleController: BlogController;

  constructor() {
    this.router = Router();
    this.sampleController = new BlogController();
    this.initializedRoutes();
  }

  private initializedRoutes = () => {
    this.router.get("/", this.sampleController.getBlogs);
  }; 

  getRouter = () => {
    return this.router;
  };
}