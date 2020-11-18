import { Module } from '@nestjs/common';
import { ArticlesController, ArticlesService } from './articles';
import { CommentsController, CommentsService } from './comments';
import { SharedModule } from '../shared';

import { ProfilesService } from './profiles';
import { ReactionsController, ReactionsService } from './reactions';
import { TagsController, TagsServices } from './tags';
import { ProfilesController } from './profiles/profiles.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [SharedModule],
  controllers: [
    UserController,
    ProfilesController,
    ArticlesController,
    CommentsController,
    ReactionsController,
    TagsController,
  ],
  providers: [
    ProfilesService,
    ArticlesService,
    CommentsService,
    ReactionsService,
    TagsServices,
  ],
})
export class FeaturesModule {}
