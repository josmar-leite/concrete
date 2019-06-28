import { UserController } from 'src/modules/backoffice/controllers/user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import 'dotenv/config';
import * as request from 'supertest';

describe('UserController (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [UserController],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/search/1')
            .expect(200)
            .expect('Hello word');
    });
});
