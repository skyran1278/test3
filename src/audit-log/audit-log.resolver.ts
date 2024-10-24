import { Resolver } from '@nestjs/graphql';

import { AuditLog } from './audit-log.audit-log-entity';

@Resolver(() => AuditLog)
export class AuditLogResolver {
  // constructor(
  //   private readonly auditLogRepository: AuditLogRepository,
  //   private readonly auditLogService: AuditLogService,
  // ) {}
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
