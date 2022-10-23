import { Admin } from "../../domain/Admin";
import { Staff } from "../../domain/Staff";

export abstract class ILoginRepository {
    abstract findUserByAdmin(username: string, password: string): Promise<Admin>;
    abstract findUserByStaff(username: string, password: string): Promise<Staff>;
}