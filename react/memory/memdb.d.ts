// react/memory/memdb.d.ts
export function getAll(): any[];
export function get(id: number): any;
export function deleteById(id: number): void;
export function post(item: any): void;
export function put(id: number, item: any): void;
export function getPage(page: number, size: number, search:string): { data: any[]; currentPage: number; totalPages: number; };
