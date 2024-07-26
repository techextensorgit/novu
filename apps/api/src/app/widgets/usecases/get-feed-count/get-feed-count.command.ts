import { EnvironmentWithSubscriber } from '../../../shared/commands/project.command';
import { IsDefined,IsArray, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ChannelTypeEnum } from '@novu/shared';
export class GetFeedCountCommand extends EnvironmentWithSubscriber {
  @IsOptional()
  @IsArray()
  feedId?: string[];

  @IsOptional()
  seen?: boolean;

  @IsOptional()
  channel: ChannelTypeEnum;
  
  @IsOptional()
  read?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (isNaN(value) || value == null) {
      return 100;
    }

    return value;
  })
  @Min(1)
  @Max(1000)
  limit: number;
}
