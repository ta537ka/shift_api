import { IShiftRepository } from "../repository/IShiftRepository";

export class ListShifts {
    private shiftRepository: IShiftRepository;

    constructor(shiftRepository: IShiftRepository) {
        this.shiftRepository = shiftRepository;
    }

    execute(start_date: Date, end_date: Date) {
        return this.shiftRepository.findAll(start_date, end_date);
    }
}