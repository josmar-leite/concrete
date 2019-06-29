import * as request from 'supertest';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import { CreateUserDto } from './../src/modules/backoffice/dtos/create-user.dto';
import { SignInDto } from './../src/modules/backoffice/dtos/sign-in.dto';

describe('Users', () => {
    let app = 'https://concrete-demo.herokuapp.com';

    let createUserDto: CreateUserDto = {
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '123456',
        phones: [{
            number: '3212-5678',
            ddd: '81',
        }],
    };

    let signInDto: SignInDto = {
        email: 'teste@gmail.com',
        password: '123456',
    };

    let user = {
        _id: String,
        name: String,
        email: String,
        phones: [],
        createdAt: Date,
        updatedAt: Date,
        lastLogin: Date,
        token: String
    };

    beforeAll(async () => {
        //await mongoose.connect(process.env.MONGO_URI);
        //await mongoose.connection.db.dropDatabase();
    });

    it('POST /sign-up', () => {
        return request(app)
            .post('/sign-up')
            .send(createUserDto)
            .expect(201);
    });

    it('POST /sign-in', () => {
        return request(app)
            .post('/sign-in')
            .send(signInDto)
            .expect(({ body }) => {
                user = body.data;
            })
            .expect(201);
    });

    it('GET /search/:id', () => {
        return request(app)
            .get(`/search/${user._id}`)
            .set('Authorization', `Bearer ${user.token}`)
            .expect(200);
    });

    afterAll(async () => {
        //await mongoose.disconnect();
    });
});
