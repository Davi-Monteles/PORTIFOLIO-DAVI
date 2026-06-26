import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App'
import AppPt from './AppPt'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/pt', element: <AppPt /> },
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
