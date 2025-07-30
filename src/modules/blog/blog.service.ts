import { Prisma } from '../../generated/prisma';
import { PaginationQueryParams } from '../paginatio/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { GetBlogsDto } from './dto/get-blogs.dto';


export class BlogService {
  private prisma: PrismaService;

  constructor() {
    this.prisma = new PrismaService();
  }

  getBlogs = async (query: GetBlogsDto) => {
    const { take, page, sortby, sortOrder,search } = query;

    const whereClause: Prisma.BlogWhereInput = {}

if (search) {
  whereClause.title = { contains: search, mode: "insensitive" }
}

    const blogs = await this.prisma.blog.findMany({
      where: whereClause,
      orderBy: { [sortby]: sortOrder },
      skip: (page - 1) * take,
      take: take,
      include: {
        user: {omit: {password: true}},
      }, // join ke table user
    });

    const total = await this.prisma.blog.count({where: whereClause});

    return {
      data: blogs,
      meta: { page, take, total },
    };
  };
}
