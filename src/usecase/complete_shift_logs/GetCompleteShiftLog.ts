import { ICompleteShiftLogRepository } from "../repository/ICompleteShiftLogRepository";

export class GetCompleteShiftLog {
    private completeShiftLogRepository: ICompleteShiftLogRepository;

    constructor(completeShiftLogRepository: ICompleteShiftLogRepository) {
        this.completeShiftLogRepository = completeShiftLogRepository;
    }

    execute(id: number) {
        return this.completeShiftLogRepository.find(id);
    }
}