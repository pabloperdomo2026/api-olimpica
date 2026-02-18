import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('Tipo Programacion')
@ApiBearerAuth()
@Controller('tipo-programacion')
export class TipoProgramacionController {}