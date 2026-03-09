import { Controller, Post, Body, Query, Logger, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AiCopilotService } from './ai-copilot.service';

@Controller('ai-copilot')
@UseInterceptors(ClassSerializerInterceptor)
export class AiCopilotController {
    private readonly logger = new Logger(AiCopilotController.name);

    constructor(private readonly aiService: AiCopilotService) { }

    @Post('chat')
    async chat(@Body() body: { message: string, context?: string }) {
        this.logger.log(`Received message: ${body.message}`);
        const { message, context } = body;
        return await this.aiService.processQuery(message, context);
    }
}

import { Module } from '@nestjs/common';

@Module({
    providers: [AiCopilotService],
    controllers: [AiCopilotController],
    exports: [AiCopilotService]
})
export class AiCopilotModule { }
