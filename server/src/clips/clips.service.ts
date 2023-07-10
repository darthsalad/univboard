import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClipDto } from './dto/create-clip.dto';
// import { UpdateClipDto } from './dto/update-clip.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Clip } from 'schema/clips.schema';
import mongoose, { Model } from 'mongoose';
import { User } from 'schema/users.schema';
import { UpdateClipDto } from './dto/update-clip.dto';

@Injectable()
export class ClipsService {
  constructor(
    @InjectModel(Clip.name)
    private clipModel: Model<Clip>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getClips(uid: string): Promise<Clip[]> {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const id = new mongoose.Types.ObjectId(uid);
    const clips = await this.clipModel.find({ owner: id });
    return clips;
  }

  async getClipById(uid: string, cid: string): Promise<Clip> {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const clip = await this.clipModel.findById(cid);
    if (!clip) {
      throw new NotFoundException('Clip not found');
    }
    return clip;
  }

  async createClip(
    uid: string,
    createClipDto: CreateClipDto,
  ): Promise<{ message: string; clip: Clip }> {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    createClipDto.owner = new mongoose.Types.ObjectId(uid) as any;
    createClipDto.createdOn = new Date();
    createClipDto.modifiedOn = new Date();
    createClipDto.pinned = false;
    createClipDto.collaborators = [];
    createClipDto.archived = false;
    createClipDto.backdrop = '';
    createClipDto.labels = [];
    const clip = new this.clipModel(createClipDto);

    await clip.save();
    return {
      message: 'New Clip created',
      clip: clip,
    };
  }

  async updateClip(
    uid: string,
    cid: string,
    updateClipDto: UpdateClipDto,
  ): Promise<{ message: string; newClip: Clip }> {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const clip = await this.clipModel.findById(cid);
    if (!clip) {
      throw new NotFoundException('Clip not found');
    }
    updateClipDto.modifiedOn = new Date();
    console.log(updateClipDto);
    Object.assign(clip, updateClipDto);
    await clip.save();
    return {
      message: `Clip of id ${cid} updated.`,
      newClip: clip,
    };
  }

  async addCollaborators(
    uid: string,
    cid: string,
    collaboratorIds: string[],
  ): Promise<{ message: string; newClip: Clip }> {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const clip = await this.clipModel.findById(cid);
    if (!clip) {
      throw new NotFoundException('Clip not found');
    }

    const collaborators = await this.userModel.find({
      _id: { $in: collaboratorIds },
    });

    if (collaborators.length != collaboratorIds.length) {
      throw new NotFoundException('One or more collaborators not found');
    }

    const newCollaborators = collaborators.filter((collaborator) => {
      return !clip.collaborators.includes(collaborator._id.toString());
    });

    if (newCollaborators.length != collaborators.length) {
      throw new ConflictException('One or more collaborators already exist');
    }

    clip.collaborators.push(
      ...newCollaborators.map((collaborator) => collaborator._id.toString()),
    );
    clip.modifiedOn = new Date();
    await clip.save();

    return {
      message: `Collaborators added to clip of id ${cid}.`,
      newClip: clip,
    };
  }

  async getCollaborators(
    uid: string,
    cid: string,
  ): Promise<{ message: string; collaborators: User[] }> {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const clip = await this.clipModel.findById(cid);
    if (!clip) {
      throw new NotFoundException('Clip not found');
    }
    const collaborators = [];
    await Promise.all(
      clip.collaborators.map(async (collaborator) => {
        const collaboratorDocument = await this.userModel.findById(
          collaborator,
        );
        if (!collaboratorDocument) {
          throw new NotFoundException('Collaborator not found');
        }
        collaborators.push({
          _id: collaboratorDocument._id,
          name: collaboratorDocument.name,
          email: collaboratorDocument.email,
          createdOn: collaboratorDocument.createdOn,
        });
      }),
    );
    return {
      message: `Collaborators of clip of id ${cid}.`,
      collaborators: collaborators,
    };
  }

  async removeCollaborator(
    uid: string,
    cid: string,
    collaboratorId: string,
  ): Promise<{ message: string; newClip: Clip }> {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const clip = await this.clipModel.findById(cid);
    if (!clip) {
      throw new NotFoundException('Clip not found');
    }
    const collaborator = await this.userModel.findById(collaboratorId);
    if (!collaborator) {
      throw new NotFoundException('Collaborator not found');
    }
    if (!clip.collaborators.includes(collaborator._id.toString())) {
      throw new NotFoundException('Collaborator not found');
    }

    clip.collaborators = clip.collaborators.filter(
      (collaborator) => collaborator != collaboratorId,
    );
    clip.modifiedOn = new Date();
    await clip.save();

    return {
      message: `Collaborator of id ${collaboratorId} removed from clip of id ${cid}.`,
      newClip: clip,
    };
  }

  async deleteClip(uid: string, cid: string): Promise<{ message: string }> {
    const user = await this.userModel.findById(uid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const clip = await this.clipModel.findById(cid);
    if (!clip) {
      throw new NotFoundException('Clip not found');
    }

    await this.clipModel.deleteOne({ _id: cid });
    return {
      message: `Clip of id ${cid} deleted.`,
    };
  }

  // async deleteAllClips(uid: string): Promise<{ message: string }> {
  //   const user = await this.userModel.findById(uid);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   user.clips = [];
  //   await user.save();
  //   return {
  //     message: `All clips deleted.`,
  //   };
  // }
}
