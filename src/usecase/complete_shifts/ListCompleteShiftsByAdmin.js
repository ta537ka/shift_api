"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCompleteShiftsByAdmin = void 0;
class ListCompleteShiftsByAdmin {
    constructor(completeShiftRepositroy) {
        this.completeShiftRepository = completeShiftRepositroy;
    }
    execute(start_date, end_date) {
        return this.completeShiftRepository.findAllByAdmin(start_date, end_date);
    }
}
exports.ListCompleteShiftsByAdmin = ListCompleteShiftsByAdmin;
