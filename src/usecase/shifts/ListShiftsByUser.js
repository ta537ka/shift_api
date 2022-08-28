"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListShiftsByUser = void 0;
class ListShiftsByUser {
    constructor(shiftRepository) {
        this.shiftRepository = shiftRepository;
    }
    execute(staff_id) {
        return this.shiftRepository.findByUser(staff_id);
    }
}
exports.ListShiftsByUser = ListShiftsByUser;
