import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthResponseDto } from './dto/auth.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Signup user and return authorization token' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Create user and return authorization token',
    type: AuthResponseDto,
  })
  signUp(@Body() signUpDto: AuthDto): Promise<AuthResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login user by credentials and return authorization token',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Login user and return authorization token',
    type: AuthResponseDto,
  })
  login(@Body() loginDto: AuthDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }
}
