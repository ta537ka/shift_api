import { Shift } from "../../domain/Shift";

export abstract class IShiftRepository {
    //admin
    // abstract findAll(start_date: Date, end_date: Date): Promise<Array<Shift>>;
    abstract findAll(start_date: string, end_date: string): Promise<Array<Shift>>;

    //staff
    abstract find(id: number): Promise<Shift>;
    abstract findAllByUser(staff_id: number): Promise<Array<Shift>>;
    abstract persist(shift: Shift): Promise<Shift>;
    abstract update(shift: Shift): Promise<Shift>;
    abstract delete(id: number): Promise<Shift>;
}