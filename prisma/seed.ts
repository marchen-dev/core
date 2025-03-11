/* eslint-disable no-console */
import { fakerZH_CN as faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

// 使用中文版本的 faker

// 初始化 Prisma 客户端
const prisma = new PrismaClient()

// 图片生成函数
function generateAvatar(seed: string = ''): string {
  // 使用 Picsum 返回 JPG 格式头像
  const seedValue = seed || faker.string.alphanumeric(10)
  return `https://picsum.photos/seed/${seedValue}/200/200.jpg`
}

function generateImageUrl(
  width: number = 800,
  height: number = 600,
  seed: string = '',
): string {
  // 使用 Picsum 返回 JPG 格式图片
  const seedValue = seed || faker.string.alphanumeric(5)
  return `https://picsum.photos/seed/${seedValue}/${width}/${height}.jpg`
}

// 清除所有表数据的函数
async function clearAllData() {
  console.log('Clearing all existing data...')

  // 因为外键约束，需要按照特定顺序删除
  await prisma.posts.deleteMany({})
  console.log('Posts table cleared.')

  await prisma.categories.deleteMany({})
  console.log('Categories table cleared.')

  await prisma.friends.deleteMany({})
  console.log('Friends table cleared.')

  await prisma.users.deleteMany({})
  console.log('Users table cleared.')

  // Site 表不删除，而是更新
  console.log('All tables cleared successfully.')
}

async function seed() {
  // 先清除所有数据
  await clearAllData()
  console.log('Start seeding...')

  // ------------------------------
  // 填充 USERS 表
  // ------------------------------
  await prisma.users.create({
    data: {
      id: faker.string.uuid(),
      name: faker.internet.username(),
      nickname: faker.person.firstName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      authCode: faker.string.uuid(),
      introduce: faker.lorem.sentence(),
      avatar: generateAvatar(),
      social: {
        twitter: faker.internet.url(),
        github: faker.internet.url(),
      },
    },
  })

  console.log('Users are seeded.')

  // ------------------------------
  // 填充 FRIENDS 表
  // ------------------------------
  for (let i = 0; i < 5; i++) {
    const name = faker.person.fullName()
    await prisma.friends.create({
      data: {
        id: faker.string.uuid(),
        name,
        url: faker.internet.url(),
        avatar: generateAvatar(name),
        introduce: faker.lorem.sentence(),
      },
    })
  }

  console.log('Friends are seeded.')

  // ------------------------------
  // 填充 CATEGORIES 表
  // ------------------------------
  for (let i = 0; i < 3; i++) {
    const name = faker.commerce.department()
    const slug = name.toLowerCase().replaceAll(/\s+/g, '-')

    await prisma.categories.create({
      data: {
        id: faker.string.uuid(),
        name,
        slug,
      },
    })
  }

  console.log('Categories are seeded.')

  // ------------------------------
  // 填充 POSTS 表
  // ------------------------------
  const categories = await prisma.categories.findMany() // 获取所有分类
  for (let i = 0; i < 20; i++) {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)]

    await prisma.posts.create({
      data: {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(2),
        cover: generateImageUrl(1200, 800),
        slug: faker.lorem.slug(),
        tags: [faker.lorem.word(), faker.lorem.word()],
        categoryId: randomCategory.id, // 绑定分类
      },
    })
  }

  console.log('Posts are seeded.')

  // ------------------------------
  // 填充 SITE 表(单个记录)
  // ------------------------------
  await prisma.site.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      title: faker.company.name(),
      description: faker.company.catchPhrase(),
      keywords: [faker.lorem.word(), faker.lorem.word()],
    },
  })

  console.log('Site configuration is seeded.')

  console.log('Seeding finished.')
}

// 执行函数
seed()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
