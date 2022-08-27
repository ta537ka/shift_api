"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStaff = void 0;
class ListStaff {
    constructor(staffRepository) {
        this.staffRepository = staffRepository;
    }
    execute() {
        return this.staffRepository.findAll();
    }
}
exports.ListStaff = ListStaff;
