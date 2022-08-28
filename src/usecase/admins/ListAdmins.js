"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAdmins = void 0;
class ListAdmins {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    execute() {
        return this.adminRepository.findAll();
    }
}
exports.ListAdmins = ListAdmins;
