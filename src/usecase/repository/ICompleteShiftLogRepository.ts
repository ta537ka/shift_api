import { CompleteShiftLog } from "../../domain/CompleteShiftLog";

export abstract class ICompleteShiftLogRepository {
    //staff and admin
    abstract findAll(): Promise<Array<CompleteShiftLog>>;
    abstract find(id: number): Promise<CompleteShiftLog>;

    //admin
    abstract persist(completeShiftLog: CompleteShiftLog): Promise<CompleteShiftLog>;
    abstract update(completeShiftLog: CompleteShiftLog): Promise<CompleteShiftLog>;
    abstract delete(id: number): Promise<CompleteShiftLog>;
}