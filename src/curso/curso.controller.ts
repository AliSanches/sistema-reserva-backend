import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  create(
    @Body() createCursoDto: { data: CreateCursoDto },
    @Res() res: Response,
  ) {
    try {
      const retorno = this.cursoService.create(createCursoDto.data);

      if (retorno) {
        return res.status(201).json({
          message: 'Curso Cadastrado',
          data: retorno,
        });
      } else {
        return res.status(400).json({
          message: 'Não foi possivel criar o curso',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno no servidor',
      });
    }
  }

  @Get()
  async findAll(@Query('skip') skip: number, @Res() res: Response) {
    try {
      const retorno = await this.cursoService.findAll(+skip);

      if (retorno) {
        return res.status(200).json({
          retorno,
        });
      } else if (retorno) {
        return res.status(400).json({
          message: 'Não foi possivel carregar os dados',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno no servidor',
      });
    }
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCursoDto: { data: UpdateCursoDto },
    @Res() res: Response,
  ) {
    try {
      const retorno = this.cursoService.update(+id, updateCursoDto.data);

      if (retorno) {
        return res.status(201).json({
          message: 'Curso Atualizado',
        });
      } else {
        return res.status(400).json({
          message: 'Não foi possivel atualizar o curso',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno no servidor',
      });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res() res: Response) {
    try {
      const retorno = this.cursoService.remove(+id);

      if (retorno) {
        return res.status(201).json({
          message: 'Curso Deletado',
        });
      } else {
        return res.status(400).json({
          message: 'Não foi possivel deletar o curso',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Erro interno no servidor',
      });
    }
  }
}
