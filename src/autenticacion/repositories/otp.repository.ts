import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpEntity } from '../entities/otp.entity';

@Injectable()
export class OtpRepository {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly repo: Repository<OtpEntity>,
  ) {}

  async crear(usuarioId: string, codigo: string, fechaExpiracion: Date): Promise<OtpEntity> {
    return this.repo.save({ usuarioId, codigo, fechaExpiracion, usado: false });
  }

  async buscarPorCodigo(codigo: string): Promise<OtpEntity | null> {
    return this.repo.findOne({ where: { codigo } });
  }

  async buscarPorCodigoYUsuario(usuarioId: string, codigo: string): Promise<OtpEntity | null> {
    return this.repo.findOne({ where: { usuarioId, codigo, usado: false } });
  }

  async invalidarOtpsDeUsuario(usuarioId: string): Promise<void> {
    await this.repo.delete({ usuarioId });
  }

  async marcarComoUsado(otpId: string): Promise<void> {
    await this.repo.update({ otpId }, { usado: true });
  }
}
