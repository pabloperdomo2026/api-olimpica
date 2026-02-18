import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('Tipo Fuente')
@ApiBearerAuth()
@Controller('tipo-fuente')
export class TipoFuenteController {}