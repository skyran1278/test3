import { QueueEventsHost, QueueEventsListener } from '@nestjs/bullmq';

import { QueueEnum } from '../common/queue.enum';

@QueueEventsListener(QueueEnum.DOMAIN15)
export class Domain15QueueEvents extends QueueEventsHost {}
