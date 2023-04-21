import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Res,
  UseGuards,
  UseInterceptors,
  Delete,
  Patch,
  Req,
} from '@nestjs/common';
import { ClipsService } from './clips.service';
import { CreateClipDto } from './dto/create-clip.dto';
import { UpdateClipDto } from './dto/update-clip.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  @Get(':uid')
  @UseGuards(AuthGuard())
  async getClips(@Param('uid') uid: string, @Res() response: Response) {
    const clips = await this.clipsService.getClips(uid);
    return response.status(200).json({
      clips: clips,
    });
  }

  @Post(':uid/create')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  async createClip(
    @Param('uid') uid: string,
    @Body() createClipDto: CreateClipDto,
    @Res() response: Response,
  ) {
    const res = await this.clipsService.createClip(uid, createClipDto);
    return response.status(201).json({
      message: res.message,
      clip: res.clip,
    });
  }

  @Get(':uid/:cid')
  @UseGuards(AuthGuard())
  async getClipById(
    @Param('uid') uid: string,
    @Param('cid') cid: string,
    @Res() response: Response,
  ) {
    const clip = await this.clipsService.getClipById(uid, cid);
    return response.status(200).json({
      clip: clip,
    });
  }

  @Patch(':uid/:cid')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  async updateClip(
    @Param('uid') uid: string,
    @Param('cid') cid: string,
    @Body() updateClipDto: UpdateClipDto,
    @Res() response: Response,
  ) {
    const res = await this.clipsService.updateClip(uid, cid, updateClipDto);
    return response.status(200).json({
      message: res.message,
      newClip: res.newClip,
    });
  }

  @Patch(':uid/:cid/add-collaborators')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  async addCollaborators(
    @Param('uid') uid: string,
    @Param('cid') cid: string,
    @Req() request: any,
    @Res() response: Response,
  ) {
    const res = await this.clipsService.addCollaborators(
      uid,
      cid,
      request.body.collaborators,
    );
    return response.status(200).json({
      message: res.message,
      newClip: res.newClip,
    });
  }

  @Get(':uid/:cid/get-collaborators')
  @UseGuards(AuthGuard())
  async getCollaborators(
    @Param('uid') uid: string,
    @Param('cid') cid: string,
    @Res() response: Response,
  ) {
    const collaboarators = await this.clipsService.getCollaborators(uid, cid);
    return response.status(200).json({
      message: collaboarators.message,
      collaborators: collaboarators.collaborators,
    });
  }

  @Delete(':uid/:cid/remove-collaborator')
  @UseGuards(AuthGuard())
  async removeCollaborator(
    @Param('uid') uid: string,
    @Param('cid') cid: string,
    @Req() request: any,
    @Res() response: Response,
  ) {
    const res = await this.clipsService.removeCollaborator(
      uid,
      cid,
      request.body.collaborator,
    );
    return response.status(200).json({
      message: res.message,
      newClip: res.newClip,
    });
  }

  @Delete(':uid/:cid')
  @UseGuards(AuthGuard())
  async deleteClip(
    @Param('uid') uid: string,
    @Param('cid') cid: string,
    @Res() response: Response,
  ) {
    const res = await this.clipsService.deleteClip(uid, cid);
    return response.status(200).json({
      message: res.message,
    });
  }
}
