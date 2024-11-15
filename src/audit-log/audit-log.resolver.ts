import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Transactional } from 'typeorm-transactional';

import { AuditLog } from './audit-log.entity';
import { AuditLogService } from './audit-log.service';
import { RevertAuditLogInput } from './mutation/revert-audit-log.input';
import { RevertAuditLogOutput } from './mutation/revert-audit-log.output';

@Resolver(() => AuditLog)
export class AuditLogResolver {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Transactional()
  @Mutation(() => RevertAuditLogOutput)
  async revertAuditLog(
    @Args('input') input: RevertAuditLogInput,
  ): Promise<RevertAuditLogOutput> {
    const auditLogs = await this.auditLogService.revertOne(input.requestId);
    return { auditLogs };
  }

  // @Transactional()
  // @Mutation(() => CreateAuditLogOutput)
  // async createAuditLog(
  //   @Args('input') input: CreateAuditLogInput,
  // ): Promise<CreateAuditLogOutput> {
  //   const auditLog = await this.auditLogService.saveOne(input);
  //   return { auditLog };
  // }
  // @Transactional()
  // @Query(() => AuditLogPage)
  // auditLogPage(@Args() args: AuditLogPageArgs): Promise<AuditLogPage> {
  //   return this.auditLogService.findPage(args);
  // }
  // @Transactional()
  // @Query(() => AuditLog)
  // auditLog(
  //   @Args('id', { type: () => ID }) id: string,
  // ): Promise<Maybe<AuditLog>> {
  //   return this.auditLogRepository.findOne({ where: { id } });
  // }
  // @Transactional()
  // @Mutation(() => UpdateAuditLogOutput)
  // async updateAuditLog(
  //   @Args('input') input: UpdateAuditLogInput,
  // ): Promise<UpdateAuditLogOutput> {
  //   const auditLog = await this.auditLogService.saveOne(input);
  //   return { auditLog };
  // }
  // @Transactional()
  // @Mutation(() => RemoveAuditLogOutput)
  // async removeAuditLog(
  //   @Args('input') input: RemoveAuditLogInput,
  // ): Promise<RemoveAuditLogOutput> {
  //   const auditLog = await this.auditLogService.removeOne(input.id);
  //   return { auditLog };
  // }
}
