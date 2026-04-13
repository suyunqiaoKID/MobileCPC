import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="text-xl font-bold text-gray-900">MobileCPC</span>
              </Link>
              
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <Link to="/" className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                  首页
                </Link>
                <Link to="/problems" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  题目
                </Link>
                <Link to="/profile" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  进度
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <span className="text-sm text-gray-700">欢迎回来</span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary"
                  >
                    退出
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-500 hover:text-gray-900 text-sm font-medium">
                    登录
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-primary"
                  >
                    注册
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>MobileCPC - 简洁高效的算法训练平台</p>
            <p className="mt-2">© 2026 MobileCPC Team. MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
