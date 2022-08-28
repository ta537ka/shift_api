"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListShifts = void 0;
class ListShifts {
    constructor(shiftRepository) {
        this.shiftRepository = shiftRepository;
    }
    execute(start_date, end_date) {
        return this.shiftRepository.findAll(start_date, end_date);
    }
}
exports.ListShifts = ListShifts;
