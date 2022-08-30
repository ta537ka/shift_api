import { ICompleteShiftRepository } from "../repository/ICompleteShiftRepository";

export class ListCompleteShiftsByStaff {
    private completeShiftRepository: ICompleteShiftRepository;

    constructor(completeShiftRepositroy: ICompleteShiftRepository) {
        this.completeShiftRepository = completeShiftRepositroy;
    }

    execute(start_date: string, end_date: string) {
        return this.completeShiftRepository.findAllByStaff(start_date, end_date);
    }
}