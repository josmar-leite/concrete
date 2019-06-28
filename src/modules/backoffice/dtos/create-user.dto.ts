import { ApiModelProperty } from '@nestjs/swagger';

import { Phone } from 'src/modules/backoffice/models/phone.model';

export class CreateUserDto {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly password: string;

  @ApiModelProperty()
  readonly phones: Phone[];
  }
