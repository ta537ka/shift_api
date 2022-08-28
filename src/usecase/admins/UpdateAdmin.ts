import { IAdminRepository } from "../repository/IAdminRepository";

export class UpdateAdmin {
    private adminRepository: IAdminRepository;

    constructor(adminRepository: IAdminRepository) {
        this.adminRepository = adminRepository;
    }

    async execute(id: number, username: string, password: string) {
        const admin = await this.adminRepository.find(id);
        admin.id = id;
        admin.username = username;
        admin.password = password;
        return this.adminRepository.update(admin);
    }
}