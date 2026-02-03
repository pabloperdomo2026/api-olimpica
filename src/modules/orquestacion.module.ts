import { Module } from "@nestjs/common";
import { OrquestacionController } from "src/controllers/orquestacion.controller";
import { CrearFrameworkOrquestacionUseCase } from "src/usecases/crear-framework-orquestacion.use-case";
import { CrearMedallonOrquestacionUseCase } from "src/usecases/crear-medallon-orquestacion.use-case";
import { CrearPublicacionOrquestacionUseCase } from "src/usecases/crear-publicacion-orquestacion.use-case";

@Module({
    controllers: [OrquestacionController],
    providers: [CrearFrameworkOrquestacionUseCase, CrearMedallonOrquestacionUseCase, CrearPublicacionOrquestacionUseCase],
    exports: [],
})
export class OrquestacionModule { }