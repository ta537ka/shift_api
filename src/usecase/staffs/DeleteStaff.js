"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteStaff = void 0;
class DeleteStaff {
    constructor(staffRepository) {
        this.staffRepository = staffRepository;
    }
    execute(id) {
        const staff = this.staffRepository.delete(id);
        return staff;
    }
}
exports.DeleteStaff = DeleteStaff;
