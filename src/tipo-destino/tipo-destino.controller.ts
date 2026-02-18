import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('Tipo Destino')
@ApiBearerAuth()
@Controller('tipo-destino')
export class TipoDestinoController {}