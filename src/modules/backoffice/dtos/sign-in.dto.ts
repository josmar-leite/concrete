import { ApiModelProperty } from '@nestjs/swagger';

export class SignInDto {
    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;
}
