import { IsOptional,IsString } from "class-validator";
import { PaginationQueryParams } from "../../paginatio/dto/pagination.dto";

export class GetBlogsDto extends PaginationQueryParams {
    @IsOptional()
    @IsString()
    search?: string;
}