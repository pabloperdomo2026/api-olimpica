import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('Tipo Datos')
@ApiBearerAuth()
@Controller('tipo-dato')
export class TipoDatoController {}