import { Body, Controller, Post } from "@nestjs/common";
import { CrearFrameworkOrquestacionUseCase, CrearMedallonOrquestacionUseCase, CrearPublicacionOrquestacionUseCase } from "src/orquestacion/casos-de-uso";

@Controller({ version: '1', path: 'orquestacion' })
export class OrquestacionController {
    constructor(
        private readonly crearFrameworkOrquestacionUseCase: CrearFrameworkOrquestacionUseCase,
        private readonly crearMedallonOrquestacionUseCase: CrearMedallonOrquestacionUseCase,
        private readonly crearPublicacionOrquestacionUseCase: CrearPublicacionOrquestacionUseCase,
    ) { }
    
    @Post('crear-framework')
    async crearFramework(@Body() data: any) {
        return this.crearFrameworkOrquestacionUseCase.execute(data);
    }

    @Post('crear-medallon')
    async crearMedallon(@Body() data: any) {
        return this.crearMedallonOrquestacionUseCase.execute(data);
    }

    @Post('crear-publicacion')
    async crearPublicacion(@Body() data: any) {
        return this.crearPublicacionOrquestacionUseCase.execute(data);
    }
}