export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

export class PaginatedResults<T> {
    data: T;
    pagination: Pagination;

    constructor(data: T, pagination: Pagination){
        this.data = data;
        this.pagination = pagination;
    }
}

export class PagingParamas {
    pageNumber = 1;
    pageSize = 2;
}