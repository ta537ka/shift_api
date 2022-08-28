import { IShiftRepository } from "../repository/IShiftRepository";

export class ListShiftsByUser {
    private shiftRepository: IShiftRepository;

    constructor(shiftRepository: IShiftRepository) {
        this.shiftRepository = shiftRepository;
    }

    execute(staff_id: number) {
        return this.shiftRepository.findByUser(staff_id);
    }
}