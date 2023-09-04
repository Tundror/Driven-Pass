import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    prisma = app.get(PrismaService)

    await prisma.card.deleteMany()
    await prisma.credential.deleteMany()
    await prisma.note.deleteMany()
    await prisma.user.deleteMany()

    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('I’m okay!');
  });
  describe("users tests", () => {
    describe("/sign-up/sign-in tests", () => {
      it("should sign-up", async () => {
        await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          })
          .expect(HttpStatus.CREATED)
      })

      it("should sign-in", async () => {
        await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          })
        await request(app.getHttpServer())
          .post('/users/sign-in')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          })
          .expect(HttpStatus.CREATED)
      })
    })
    describe("credentials tests", () => {
      it("should post credential", async () => {
        await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          })
        const loginResponse = await request(app.getHttpServer())
          .post('/users/sign-in')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          });

        const authToken = loginResponse.body.token;

        await request(app.getHttpServer())
          .post('/credentials')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            url: "https://twitter.com/home",
            username: "kratos",
            password: "senha",
            name: "twitter4"
          })
          .expect(HttpStatus.CREATED)
      })

      it("should get credentials", async () => {
        await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          })
        const loginResponse = await request(app.getHttpServer())
          .post('/users/sign-in')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          });

        const authToken = loginResponse.body.token;

        await request(app.getHttpServer())
          .post('/credentials')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            url: "https://twitter.com/home",
            username: "kratos",
            password: "senha",
            name: "twitter4"
          })

        const result = await request(app.getHttpServer())
          .get('/credentials')
          .set('Authorization', `Bearer ${authToken}`)
          .expect(HttpStatus.OK)

        expect(result.body).toHaveLength(1)
      })
      it("should get one credential", async () => {
        const user = await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          })
        const loginResponse = await request(app.getHttpServer())
          .post('/users/sign-in')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          });

        const authToken = loginResponse.body.token;

        const credential = await prisma.credential.create({
          data: {
            url: "https://twitter.com/home",
            username: "kratos",
            password: "1532a863fc15349473082a00ace9582dce7bedbfcf802533fa7a4567fb377be149361a4ac818e894010b5a959aa1011817921de6059219c5eff721e655e41bfcc49ec628beedad308cc7e3acd35a955a3b9764d4afac977a9badc0d09b9698e7827459dac8",
            name: "twitter4",
            userId: user.body.id
          }
        })

        const result = await request(app.getHttpServer())
          .get(`/credentials/${credential.id}`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(HttpStatus.OK)

        expect(result.body).toStrictEqual({
          id: credential.id,
          url: "https://twitter.com/home",
          username: "kratos",
          password: "senha",
          name: "twitter4",
          userId: user.body.id
        })
      })
      it("should delete credentials", async () => {
        const user = await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          })
        const loginResponse = await request(app.getHttpServer())
          .post('/users/sign-in')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          });

        const authToken = loginResponse.body.token;

        const credential = await prisma.credential.create({
          data: {
            url: "https://twitter.com/home",
            username: "kratos",
            password: "1532a863fc15349473082a00ace9582dce7bedbfcf802533fa7a4567fb377be149361a4ac818e894010b5a959aa1011817921de6059219c5eff721e655e41bfcc49ec628beedad308cc7e3acd35a955a3b9764d4afac977a9badc0d09b9698e7827459dac8",
            name: "twitter4",
            userId: user.body.id
          }
        })

        const result = await request(app.getHttpServer())
          .delete(`/credentials/${credential.id}`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(HttpStatus.OK)
      })
    })
    describe("notes tests", () => {
      it("should post note", async () => {
        const user = await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          })
        const loginResponse = await request(app.getHttpServer())
          .post('/users/sign-in')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          });

        const authToken = loginResponse.body.token;
        const result = await request(app.getHttpServer())
          .post(`/notes`)
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            name: "note",
            text: "text"
          })
          .expect(HttpStatus.CREATED)
      })
      it("should get note", async () => {
        const user = await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          })
        const loginResponse = await request(app.getHttpServer())
          .post('/users/sign-in')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          });

        const authToken = loginResponse.body.token;

        const note = await prisma.note.create({
          data: {
            name: "note",
            text: "text",
            userId: user.body.id
          }
        })
        const result = await request(app.getHttpServer())
          .get(`/notes`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(HttpStatus.OK)
        expect(result.body).toHaveLength(1)
      })
      it("should delete note", async () => {
        const user = await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          })
        const loginResponse = await request(app.getHttpServer())
          .post('/users/sign-in')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          });

        const authToken = loginResponse.body.token;

        const note = await prisma.note.create({
          data: {
            name: "note",
            text: "text",
            userId: user.body.id
          }
        })
        const result = await request(app.getHttpServer())
          .delete(`/notes/${note.id}`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(HttpStatus.OK)
      })
    })
    describe("card tests", () => {
      it("should post card", async () => {
        const user = await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          })
        const loginResponse = await request(app.getHttpServer())
          .post('/users/sign-in')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          });

        const authToken = loginResponse.body.token;

        const result = await request(app.getHttpServer())
          .post(`/cards`)
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            name: "Nome do titular do cartão",
            number: 1234567890123456,
            cvv: 123,
            expiration: "2023-12-31T00:00:00.000Z",
            virtual: true,
            type: "CREDIT",
            nameOnCard: "Nome impresso no cartão"
          })
          .expect(HttpStatus.CREATED)
      })
      it("should get card", async () => {
        const user = await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          })
        const loginResponse = await request(app.getHttpServer())
          .post('/users/sign-in')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          });

        const authToken = loginResponse.body.token;

        const card = await request(app.getHttpServer())
        .post(`/cards`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: "Nome do titular do cartão",
          number: 1234567890123456,
          cvv: 123,
          expiration: "2023-12-31T00:00:00.000Z",
          virtual: true,
          type: "CREDIT",
          nameOnCard: "Nome impresso no cartão"
        })
        const result = await request(app.getHttpServer())
          .get(`/cards`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(HttpStatus.OK)
        expect(result.body).toHaveLength(1)
      })
      it("should delete card", async () => {
        const user = await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          })
        const loginResponse = await request(app.getHttpServer())
          .post('/users/sign-in')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          });

        const authToken = loginResponse.body.token;

        const card = await request(app.getHttpServer())
        .post(`/cards`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: "Nome do titular do cartão",
          number: 1234567890123456,
          cvv: 123,
          expiration: "2023-12-31T00:00:00.000Z",
          virtual: true,
          type: "CREDIT",
          nameOnCard: "Nome impresso no cartão"
        })
        const result = await request(app.getHttpServer())
          .delete(`/cards/${card.body.id}`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(HttpStatus.OK)
      })
    })
    describe("erase test", () => {
      it("should delete account", async () => {
        const user = await request(app.getHttpServer())
          .post('/users/sign-up')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          })
        const loginResponse = await request(app.getHttpServer())
          .post('/users/sign-in')
          .send({
            email: "kratos@email.com",
            password: "S3nh3F0rt3!"
          });

        const authToken = loginResponse.body.token;

        const result = await request(app.getHttpServer())
          .post(`/erase`)
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            password: "S3nh3F0rt3!"
          })
          .expect(HttpStatus.CREATED)

      })
    })
  })
});
