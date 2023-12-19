import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'The username for authentication.',
    example: 'user-1',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password for authentication.',
    example: '123456',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAzMDIzMzMzLCJleHAiOjE3MDMwMjM2MzN9.XbmRkfTLS0A3ckPjQeXKvatuMY6BRduyZJ0Y_W5SH4s',
    description: 'Authentication JWT token.',
  })
  token: string;
}
