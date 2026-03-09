import { Controller, Get, Logger } from '@nestjs/common';

@Controller('gts')
export class GtsController {
    private readonly logger = new Logger(GtsController.name);

    @Get('compliance')
    async getComplianceStatus() {
        return [
            { id: 'CMP-701', region: 'European Union (GDPR)', status: 'Compliant', alert_level: 'Low' },
            { id: 'CMP-702', region: 'North America (Export)', status: 'Review Required', alert_level: 'Moderate' },
            { id: 'CMP-703', region: 'Asia Pacific (Customs)', status: 'Approved', alert_level: 'Low' },
        ];
    }

    @Get('risk')
    async getRiskProfiles() {
        return [
            { partner: 'Star Delivery IN', score: 85, status: 'Low Risk', geography: 'India' },
            { partner: 'Volta Global Supply', score: 42, status: 'High Risk', geography: 'International' },
        ];
    }
}

import { Module } from '@nestjs/common';

@Module({
    controllers: [GtsController],
})
export class GtsModule { }
