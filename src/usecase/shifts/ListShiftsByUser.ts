import { IShiftRepository } from "../repository/IShiftRepository";

export class ListShiftsByUser {
    private shiftRepository: IShiftRepository;

    constructor(shiftRepository: IShiftRepository) {
        this.shiftRepository = shiftRepository;
    }

    execute(user_id: number) {
        return this.shiftRepository.findByUser(user_id);
    }
}