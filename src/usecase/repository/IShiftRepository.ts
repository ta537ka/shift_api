import { Shift } from "../../domain/Shift";

export abstract class IShiftRepository {
    abstract findAll(start_date: Date, end_date: Date): Promise<Array<Shift>>;
    abstract find(id: number): Promise<Shift>;
    abstract findByUser(user_id: number): Promise<Array<Shift>>;
    // abstract findByTerm(): Promise<Array<Shift>>;
    abstract persist(shift: Shift): Promise<Shift>;
    abstract update(shift: Shift): Promise<Shift>;
    abstract delete(id: number): Promise<Shift>;
}