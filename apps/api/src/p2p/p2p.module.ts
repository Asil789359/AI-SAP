import { Controller, Get, Post, Body, Logger } from '@nestjs/common';

@Controller('p2p')
export class P2pController {
    private readonly logger = new Logger(P2pController.name);

    @Get('requisitions')
    async getRequisitions() {
        return [
            { id: 'PR-8822', item: 'Electric Motors (x500)', requester: 'Industrial Hub', status: 'Pending Approval', budget: '$45,000' },
            { id: 'PR-8821', item: 'Mechanical Valves (x1000)', requester: 'Main Warehouse', status: 'Approved', budget: '$12,000' },
            { id: 'PR-8820', item: 'Hydraulic Pumps (x200)', requester: 'Plant A', status: 'In Procurement', budget: '$68,000' },
        ];
    }

    @Get('vendors')
    async getVendors() {
        return [
            { id: 'V-101', name: 'Global Supply Co', rating: 'A+', category: 'Raw Materials' },
            { id: 'V-102', name: 'Precision Parts Ltd', rating: 'A', category: 'Components' },
            { id: 'V-103', name: 'Electro-Motion', rating: 'B', category: 'Electronics' },
        ];
    }
}

import { Module } from '@nestjs/common';

@Module({
    controllers: [P2pController],
})
export class P2pModule { }
