import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiCopilotModule } from './ai-copilot/ai-copilot.module';
import { FinanceModule } from './finance/finance.module';
import { SalesModule } from './sales/sales.module';
import { P2pModule } from './p2p/p2p.module';
import { GtsModule } from './gts/gts.module';
import { FinancialServicesModule } from './financial-services/financial-services.module';

@Module({
  imports: [
    AiCopilotModule,
    FinanceModule,
    SalesModule,
    P2pModule,
    GtsModule,
    FinancialServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
