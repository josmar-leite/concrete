import { Contract } from 'src/modules/backoffice/contracts/contract';
import { NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class ValidatorInterceptor implements NestInterceptor {
    contract: Contract;
    constructor(contract: Contract);
    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any>;
}
