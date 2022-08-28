import { Admin } from "../../domain/Admin";

export abstract class IAdminRepository {
    abstract findAll(): Promise<Array<Admin>>;
    abstract find(id: number): Promise<Admin>;
    abstract persist(admin: Admin): Promise<Admin>;
    abstract update(admin: Admin): Promise<Admin>;
    abstract delete(id: number): Promise<Admin>;
}