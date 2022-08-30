import { CompleteShift } from "../../domain/CompleteShift";

export abstract class ICompleteShiftRepository {
    //admin
    abstract findAllByAdmin(start_date: string, end_date: string): Promise<Array<CompleteShift>>;
    abstract find(id: number): Promise<CompleteShift>;
    abstract persist(completeShift: CompleteShift): Promise<CompleteShift>;
    abstract update(completeShift: CompleteShift): Promise<CompleteShift>;
    abstract delete(id: number): Promise<CompleteShift>;

    //staff
    abstract findAllByStaff(start_date: string, end_date: string): Promise<Array<CompleteShift>>;
}