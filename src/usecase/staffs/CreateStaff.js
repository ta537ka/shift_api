"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStaff = void 0;
const Staff_1 = require("../../domain/Staff");
class CreateStaff {
    constructor(staffRepository) {
        this.staffRepository = staffRepository;
    }
    execute(username, password) {
        const staff = new Staff_1.Staff(username, password);
        return this.staffRepository.persist(staff);
    }
}
exports.CreateStaff = CreateStaff;
