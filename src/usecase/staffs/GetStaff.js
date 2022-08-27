"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStaff = void 0;
class GetStaff {
    constructor(staffRepository) {
        this.staffRepository = staffRepository;
    }
    execute(id) {
        return this.staffRepository.find(id);
    }
}
exports.GetStaff = GetStaff;
