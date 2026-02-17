import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolPermisoEntity } from "./rol-permiso.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RolPermisoEntity])],
    controllers: [],
    providers: [],
    exports: [],
})

export class RolPermisoModule {}
  