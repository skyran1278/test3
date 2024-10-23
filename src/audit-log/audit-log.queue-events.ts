import { QueueEventsHost, QueueEventsListener } from '@nestjs/bullmq';

import { QueueEnum } from '../common/queue.enum';

@QueueEventsListener(QueueEnum.AUDIT_LOG)
export class AuditLogQueueEvents extends QueueEventsHost {}
