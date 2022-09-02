import { ICompleteShiftLogRepository } from "../repository/ICompleteShiftLogRepository";

export class UpdateCompleteShiftLog {
    private completeShiftLogRepository: ICompleteShiftLogRepository;

    constructor(completeShiftLogRepository: ICompleteShiftLogRepository) {
        this.completeShiftLogRepository = completeShiftLogRepository;
    }

    async execute(id: number, info: string, updated_at: Date) {
        const completeShiftLog = await this.completeShiftLogRepository.find(id);
        completeShiftLog.id = id;
        completeShiftLog.info = info;
        completeShiftLog.update_at = updated_at;
        return this.completeShiftLogRepository.update(completeShiftLog);
    }
}