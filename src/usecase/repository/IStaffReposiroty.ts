import { Staff } from "../../domain/Staff";


export abstract class IStaffRepository {
    abstract findAll(): Promise<Array<Staff>>;
    abstract find(id: number): Promise<Staff>;
    abstract persist(staff: Staff): Promise<Staff>;
    abstract update(staff: Staff): Promise<Staff>;
    abstract delete(id: number): Promise<Staff>;
}