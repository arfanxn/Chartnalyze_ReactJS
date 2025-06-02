export type PanginateParams = {
    page?: number
    perPage?: number
    sort?: string
    join?: string
    filter?: string
}

export type PaginationMeta = {
    page: number
    perPage: number
    totalPages: number
    total: number
    hasPrev: boolean
    hasNext: boolean
}
