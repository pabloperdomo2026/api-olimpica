import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('Tipo Proceso')
@ApiBearerAuth()
@Controller('tipo-proceso')
export class TipoProcesoController {}