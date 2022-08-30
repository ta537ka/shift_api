import { IShiftRepository } from "../repository/IShiftRepository";

export class ListShifts {
    private shiftRepository: IShiftRepository;

    constructor(shiftRepository: IShiftRepository) {
        this.shiftRepository = shiftRepository;
    }

    // execute(start_date: Date, end_date: Date) {
    execute(start_date: string, end_date: string) {
        return this.shiftRepository.findAll(start_date, end_date);
    }
}