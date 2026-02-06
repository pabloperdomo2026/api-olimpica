import { Body, Controller, Post } from "@nestjs/common";
import { CrearFrameworkOrquestacionUseCase, CrearMedallonOrquestacionUseCase, CrearPublicacionOrquestacionUseCase } from "src/orquestacion/casos-de-uso";
import { CrearFrameworkOrquestacionDto } from "./dtos/crear-framework-orquestacion.dto";

@Controller({ version: '1', path: 'orquestacion' })
export class OrquestacionController {
    constructor(
        private readonly crearFrameworkOrquestacionUseCase: CrearFrameworkOrquestacionUseCase,
        private readonly crearMedallonOrquestacionUseCase: CrearMedallonOrquestacionUseCase,
        private readonly crearPublicacionOrquestacionUseCase: CrearPublicacionOrquestacionUseCase,
    ) { }
    
    @Post('crear-framework')
    async crearFramework(@Body() dto: CrearFrameworkOrquestacionDto) {
        return this.crearFrameworkOrquestacionUseCase.execute(dto);
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