import { QueueEventsHost, QueueEventsListener } from '@nestjs/bullmq';

import { QueueEnum } from '../common/queue.enum';

@QueueEventsListener(QueueEnum.DOMAIN0015)
export class Domain0015QueueEvents extends QueueEventsHost {}
