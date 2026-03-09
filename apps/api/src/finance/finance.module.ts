import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';

@Controller('finance')
export class FinanceController {
    private readonly logger = new Logger(FinanceController.name);

    @Get('ledger')
    async getLedgerSummary() {
        this.logger.log('Fetching ledger summary');
        return [
            { id: 1, accountName: 'Main Cash Account', balance: 450000.00, type: 'Asset' },
            { id: 2, accountName: 'Checking Account', balance: 120000.00, type: 'Asset' },
            { id: 3, accountName: 'Accounts Payable', balance: 85000.00, type: 'Liability' },
            { id: 4, accountName: 'Revenue', balance: 950000.00, type: 'Equity' },
        ];
    }

    @Get('invoices')
    async getInvoices() {
        return [
            { id: 'INV-1001', customer: 'Acme Corp', amount: 12400.00, status: 'Paid', date: '2026-03-01' },
            { id: 'INV-1002', customer: 'Global Tech', amount: 8200.00, status: 'Pending', date: '2026-03-05' },
            { id: 'INV-1003', customer: 'Nexus Ltd', amount: 3150.00, status: 'Overdue', date: '2026-02-28' },
        ];
    }
}

import { Module } from '@nestjs/common';

@Module({
    controllers: [FinanceController],
})
export class FinanceModule { }
