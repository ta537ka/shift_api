import { ICompleteShiftRepository } from "../repository/ICompleteShiftRepository";

export class GetCompleteShift {
    private completeShiftRepository: ICompleteShiftRepository;

    constructor(completeShiftRepositroy: ICompleteShiftRepository) {
        this.completeShiftRepository = completeShiftRepositroy;
    }

    execute(id: number){
        return this.completeShiftRepository.find(id);
    }
}