import { ICompleteShiftLogRepository } from "../repository/ICompleteShiftLogRepository";

export class DeleteCompleteShiftLog {
    private completeShiftLogRepository: ICompleteShiftLogRepository;

    constructor(completeShiftLogRepository: ICompleteShiftLogRepository) {
        this.completeShiftLogRepository = completeShiftLogRepository;
    }

    async execute(id: number) {
        const completeShiftLog = await this.completeShiftLogRepository.delete(id);
        return completeShiftLog;
    }
}