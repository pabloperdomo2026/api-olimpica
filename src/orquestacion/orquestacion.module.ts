import { Module } from "@nestjs/common";
import { OrquestacionController } from "src/orquestacion/orquestacion.controller";
import { CrearFrameworkOrquestacionUseCase } from "src/orquestacion/casos-de-uso/crear-framework-orquestacion.use-case";
import { CrearMedallonOrquestacionUseCase } from "src/orquestacion/casos-de-uso/crear-medallon-orquestacion.use-case";
import { CrearPublicacionOrquestacionUseCase } from "src/orquestacion/casos-de-uso/crear-publicacion-orquestacion.use-case";
import { AwsService } from "src/utils/aws.service";

@Module({
    controllers: [OrquestacionController],
    providers: [
        AwsService,
        CrearFrameworkOrquestacionUseCase,
        CrearMedallonOrquestacionUseCase,
        CrearPublicacionOrquestacionUseCase,
    ],
    exports: [
        AwsService,
        CrearFrameworkOrquestacionUseCase,
        CrearMedallonOrquestacionUseCase,
        CrearPublicacionOrquestacionUseCase,
    ],
})
export class OrquestacionModule { }