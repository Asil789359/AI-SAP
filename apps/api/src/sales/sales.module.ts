import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';

let ordersStore = [
    { id: 'ORD-7742', customer: 'Acme Corp', amount: 12400.00, status: 'Completed', date: '2026-03-08' },
    { id: 'ORD-7741', customer: 'Global Tech', amount: 8200.00, status: 'Processing', date: '2026-03-08' },
    { id: 'ORD-7740', customer: 'Nexus Ltd', amount: 3150.00, status: 'Pending', date: '2026-03-07' },
];

@Controller('sales')
export class SalesController {
    private readonly logger = new Logger(SalesController.name);

    @Get('customers')
    async getCustomers() {
        this.logger.log('Fetching customers list');
        return [
            { id: 1, name: 'Acme Corp', type: 'Enterprise', revenue: 1240000.00 },
            { id: 2, name: 'Global Tech', type: 'SMB', revenue: 450000.00 },
            { id: 3, name: 'Nexus Ltd', type: 'Partner', revenue: 89000.00 },
            { id: 4, name: 'Starlight Inc', type: 'Enterprise', revenue: 2200000.00 },
        ];
    }

    @Get('orders')
    async getOrders() {
        return ordersStore;
    }

    @Post('orders')
    async createOrder(@Body() body: any) {
        const newOrder = {
            id: `ORD-${Math.floor(Math.random() * 9000) + 7000}`,
            customer: body.customer || 'Unknown Customer',
            amount: body.amount || 0,
            status: 'Processing',
            date: new Date().toISOString().split('T')[0],
        };
        ordersStore.unshift(newOrder);
        this.logger.log(`Live Update Agent: Created order ${newOrder.id}`);
        return newOrder;
    }
}

import { Module } from '@nestjs/common';

@Module({
    controllers: [SalesController],
})
export class SalesModule { }
