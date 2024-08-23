import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// // DB 생성 테스트 코드
// async function test() {
//   // 유저 생성
//   const user = await db.user.create({
//     data: {
//       username: "이름test",
//       password: "password123",
//       email: "test@example.com",
//       bio: "This is a test user"
//     }
//   });
//   console.log("Created User:", user);

//   // 트윗 생성
//   const tweet = await db.tweet.create({
//     data: {
//       tweet: "tweettest",
//       user: {
//         connect: {
//           id: user.id,
//         },
//       },
//     },
//   });
//   console.log("Created Tweet:", tweet);

//   // 좋아요 생성
//   const like = await db.like.create({
//     data: {
//       user: {
//         connect: {
//           id: 1,
//         },
//       },
//       tweet: {
//         connect: {
//           id: 1,
//         },
//       }
//     }
//   });
//   console.log("Created Like:", like);

// }

// test();

// DB 생성 테스트 코드
async function test() {
  try {
    // 먼저 유저가 있는지 확인
    const user = await db.user.findUnique({
      where: { id: 9 },
    });

    if (!user) {
      console.log("User with id 3 not found");
      return;
    }

    // Product 생성
    const product = await db.product.create({
      data: {
        title: "고구마",
        // price: 9999,
        description: "맛있는 고구마!!!",
        photo: "/goguma.jpg",
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    console.log("Product created:", product);
  } catch (error) {
    console.error("Error creating product:", error);
  } finally {
    await db.$disconnect();
  }
}

test();


export default db;