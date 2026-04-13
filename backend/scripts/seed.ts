import { prisma } from '../src/index'

const seedProblems = [
  {
    title: '两数之和',
    description: `给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。`,
    difficulty: 'easy' as const,
    tags: ['数组', '哈希表'],
    testCases: [
      {
        input: '[2,7,11,15]\n9',
        expectedOutput: '[0,1]',
        isHidden: false,
      },
      {
        input: '[3,2,4]\n6',
        expectedOutput: '[1,2]',
        isHidden: false,
      },
      {
        input: '[3,3]\n6',
        expectedOutput: '[0,1]',
        isHidden: true,
      },
    ],
  },
  {
    title: '反转链表',
    description: `给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。`,
    difficulty: 'easy' as const,
    tags: ['链表', '递归'],
    testCases: [
      {
        input: '[1,2,3,4,5]',
        expectedOutput: '[5,4,3,2,1]',
        isHidden: false,
      },
      {
        input: '[1,2]',
        expectedOutput: '[2,1]',
        isHidden: false,
      },
      {
        input: '[]',
        expectedOutput: '[]',
        isHidden: true,
      },
    ],
  },
  {
    title: '有效的括号',
    description: `给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。`,
    difficulty: 'easy' as const,
    tags: ['栈', '字符串'],
    testCases: [
      {
        input: '"()"',
        expectedOutput: 'true',
        isHidden: false,
      },
      {
        input: '"()[]{}"',
        expectedOutput: 'true',
        isHidden: false,
      },
      {
        input: '"(]"',
        expectedOutput: 'false',
        isHidden: true,
      },
    ],
  },
  {
    title: '合并两个有序链表',
    description: `将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。`,
    difficulty: 'easy' as const,
    tags: ['链表', '递归'],
    testCases: [
      {
        input: '[1,2,4]\n[1,3,4]',
        expectedOutput: '[1,1,2,3,4,4]',
        isHidden: false,
      },
      {
        input: '[]\n[]',
        expectedOutput: '[]',
        isHidden: false,
      },
      {
        input: '[]\n[0]',
        expectedOutput: '[0]',
        isHidden: true,
      },
    ],
  },
  {
    title: '爬楼梯',
    description: `假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？`,
    difficulty: 'easy' as const,
    tags: ['动态规划'],
    testCases: [
      {
        input: '2',
        expectedOutput: '2',
        isHidden: false,
      },
      {
        input: '3',
        expectedOutput: '3',
        isHidden: false,
      },
      {
        input: '10',
        expectedOutput: '89',
        isHidden: true,
      },
    ],
  },
]

async function seed() {
  console.log('🌱 开始种子数据...')

  try {
    // 清空现有数据
    await prisma.submission.deleteMany()
    await prisma.userProgress.deleteMany()
    await prisma.user.deleteMany()
    await prisma.problem.deleteMany()

    console.log('✅ 清空现有数据完成')

    // 创建测试用户
    const testUser = await prisma.user.create({
      data: {
        username: 'testuser',
        email: 'test@example.com',
        password: '$2a$10$N9qo8uLOickgx2ZMRZoMye3Z6gZ5jYXvBq3qB5B6Qq7Q5Q5Q5Q5Q5Q', // password123
      },
    })

    await prisma.userProgress.create({
      data: {
        userId: testUser.id,
        totalSolved: 2,
        totalAttempted: 5,
        easySolved: 2,
        mediumSolved: 0,
        hardSolved: 0,
        streakDays: 3,
      },
    })

    console.log('✅ 创建测试用户完成')

    // 创建题目
    for (const problemData of seedProblems) {
      await prisma.problem.create({
        data: problemData,
      })
    }

    console.log(`✅ 创建 ${seedProblems.length} 个题目完成`)

    // 创建一些提交记录
    const problems = await prisma.problem.findMany()
    
    await prisma.submission.createMany({
      data: [
        {
          userId: testUser.id,
          problemId: problems[0].id,
          code: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}',
          language: 'javascript',
          status: 'accepted',
          time: 45,
          memory: 42,
        },
        {
          userId: testUser.id,
          problemId: problems[1].id,
          code: 'function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}',
          language: 'javascript',
          status: 'accepted',
          time: 32,
          memory: 40,
        },
      ],
    })

    console.log('✅ 创建提交记录完成')
    console.log('🎉 种子数据完成！')
    console.log('')
    console.log('📋 测试账户信息：')
    console.log('   邮箱: test@example.com')
    console.log('   密码: password123')
    console.log('')
    console.log('🚀 现在可以启动应用进行测试了！')

  } catch (error) {
    console.error('❌ 种子数据失败:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
