import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProblemsPage from './pages/ProblemsPage'
import ProblemDetailPage from './pages/ProblemDetailPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="problems" element={<ProblemsPage />} />
          <Route path="problems/:id" element={<ProblemDetailPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
