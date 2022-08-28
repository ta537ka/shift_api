"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAdmin = void 0;
class GetAdmin {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    execute(id) {
        return this.adminRepository.find(id);
    }
}
exports.GetAdmin = GetAdmin;
