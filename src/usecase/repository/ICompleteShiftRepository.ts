import { CompleteShift } from "../../domain/CompleteShift";

export abstract class ICompleteShiftRepository {
    abstract findAll(): Promise<Array<CompleteShift>>;
    abstract find(id: number): Promise<CompleteShift>;
    abstract persist(completeShift: CompleteShift): Promise<CompleteShift>;
    abstract update(completeShift: CompleteShift): Promise<CompleteShift>;
    abstract delete(id: number): Promise<CompleteShift>;
}