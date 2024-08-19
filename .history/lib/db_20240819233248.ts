import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// DB 생성 테스트 코드
async function test() {
  // 유저 생성
  const user = await db.user.create({
    data: {
      username: "이름test",
      password: "password123",
      email: "test@example.com",
      bio: "This is a test user"
    }
  });
  console.log("Created User:", user);

  // 트윗 생성
  const tweet = await db.tweet.create({
    data: {
      tweet: "tweettest",
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  console.log("Created Tweet:", tweet);

  // 좋아요 생성
  const like = await db.like.create({
    data: {
      user: {
        connect: {
          id: 1,
        },
      },
      tweet: {
        connect: {
          id: 1,
        },
      }
    }
  });
  console.log("Created Like:", like);

}
test();

export default db;