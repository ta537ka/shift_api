import { CompleteShiftLog } from "../../domain/CompleteShiftLog";
import { ICompleteShiftLogRepository } from "../repository/ICompleteShiftLogRepository";

export class CreateCompleteShiftLog {
    private completeShiftLogRepository: ICompleteShiftLogRepository;

    constructor(completeShiftLogRepository: ICompleteShiftLogRepository) {
        this.completeShiftLogRepository = completeShiftLogRepository;
    }

    execute(info: string, updated_at: Date) {
        const completeShiftLog = new CompleteShiftLog(info, updated_at);
        return this.completeShiftLogRepository.persist(completeShiftLog);
    }
}