import { UserService } from '../services';
import { User } from '../models';
import { UserResponseDto } from '../dtos';
import { AuthUser } from '@/modules/auth/types';
import { AuthGuard } from '@/modules/auth/guards';
import { CurrentUser } from '@/modules/auth/decorators';
import { ResponseInterceptor } from '@/common';
import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiResponse({ type: UserResponseDto })
  @UseInterceptors(new ResponseInterceptor(UserResponseDto))
  getUserInfo(@CurrentUser() user: AuthUser): Promise<User> {
    return this.userService.findUserById(user.id);
  }
}
