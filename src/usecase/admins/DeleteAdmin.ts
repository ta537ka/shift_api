import { IAdminRepository } from "../repository/IAdminRepository";

export class DeleteAdmin {
    private adminRepository: IAdminRepository;

    constructor(adminRepository: IAdminRepository) {
        this.adminRepository = adminRepository;
    }

    async execute(id: number) {
        const admin = this.adminRepository.delete(id);
        return admin;
    }
}