import { Controller, Get } from '@nestjs/common';

@Controller({ version: '1', path: 'health' })
export class HealthController {
    @Get()
    check() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
        };
    }
}
