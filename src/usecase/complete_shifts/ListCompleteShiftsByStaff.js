"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCompleteShiftsByStaff = void 0;
class ListCompleteShiftsByStaff {
    constructor(completeShiftRepositroy) {
        this.completeShiftRepository = completeShiftRepositroy;
    }
    execute(start_date, end_date) {
        return this.completeShiftRepository.findAllByStaff(start_date, end_date);
    }
}
exports.ListCompleteShiftsByStaff = ListCompleteShiftsByStaff;
