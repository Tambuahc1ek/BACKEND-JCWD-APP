import { plainToInstance } from "class-transformer";
import { BlogService } from "./blog.service";
import { PaginationQueryParams } from "../paginatio/dto/pagination.dto";
import { Request, Response } from "express";

export class BlogController {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  getBlogs = async (req: Request, res: Response) => {
    const query = plainToInstance(PaginationQueryParams, req.query);
    const result = await this.blogService.getBlogs(query);
    res.status(200).send(result);
  }; 
}