"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdmin = void 0;
const Admin_1 = require("../../domain/Admin");
class CreateAdmin {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    execute(username, password) {
        const admin = new Admin_1.Admin(username, password);
        return this.adminRepository.persist(admin);
    }
}
exports.CreateAdmin = CreateAdmin;
