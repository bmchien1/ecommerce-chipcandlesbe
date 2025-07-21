
export type Page<T> = {
  contents: T[],
  currentPage: number,
  perPage: number,
  totalElements: number,
  totalPage: number
}
