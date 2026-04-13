import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      {/* 英雄区域 */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          欢迎来到 MobileCPC
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          一个简洁、高效、真正可用的算法训练平台
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/problems" className="btn btn-primary px-8 py-3 text-lg">
            开始练习
          </Link>
          <Link to="/login" className="btn btn-secondary px-8 py-3 text-lg">
            立即注册
          </Link>
        </div>
      </div>

      {/* 功能特性 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-600 text-2xl">📚</span>
          </div>
          <h3 className="text-xl font-bold mb-2">精选题目</h3>
          <p className="text-gray-600">
            涵盖算法竞赛经典题目，从简单到困难循序渐进
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-600 text-2xl">💻</span>
          </div>
          <h3 className="text-xl font-bold mb-2">在线评测</h3>
          <p className="text-gray-600">
            实时代码评测，支持多种编程语言，即时反馈结果
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-600 text-2xl">📊</span>
          </div>
          <h3 className="text-xl font-bold mb-2">进度跟踪</h3>
          <p className="text-gray-600">
            可视化学习进度，智能分析薄弱环节，个性化推荐
          </p>
        </div>
      </div>

      {/* 快速开始指南 */}
      <div className="card mt-12">
        <h2 className="text-2xl font-bold mb-6">快速开始</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-bold mb-1">注册账号</h3>
              <p className="text-gray-600">创建你的个人账户，开始学习之旅</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-bold mb-1">选择题目</h3>
              <p className="text-gray-600">从题目库中选择适合你水平的题目</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-bold mb-1">编写代码</h3>
              <p className="text-gray-600">在线编写代码，支持多种编程语言</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="font-bold mb-1">提交评测</h3>
              <p className="text-gray-600">提交代码进行评测，查看结果和改进建议</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
