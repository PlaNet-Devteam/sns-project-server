import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { TagFindOneVo } from './vo';
import { TagCreateDto, TagListDto } from './dto';
import { PaginateResponseVo } from 'src/core';
import * as errors from '../../locales/kr/errors.json';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  // GET SERVICES

  /**
   * 전체 태그
   * @param tagListDto
   * @returns
   */
  public async findAll(
    tagListDto?: TagListDto,
  ): Promise<PaginateResponseVo<TagFindOneVo>> {
    return await this.tagRepository.findAll(tagListDto);
  }

  /**
   * 태그명으로 찾기
   * @param tagName
   * @returns
   */
  public async findOneByTagName(tagName: string): Promise<TagFindOneVo> {
    const tag = await this.tagRepository.findOneByTagName(tagName);
    if (!tag) throw new NotFoundException(errors.tag.notFound);
    return tag;
  }

  // INSERT SERVICES

  /**
   * 새로운 사용자 생성
   * @param tagCreateDto
   */
  public async createTag(tagCreateDto: TagCreateDto) {
    const tag = this.findOneByTagName(tagCreateDto.tagName);
    if (tag) throw new ConflictException(errors.tag.alreadyTag);
    await this.tagRepository.createTag(tagCreateDto);
  }
}
