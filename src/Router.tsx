import App from 'components/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function Router() {
  const routes = createBrowserRouter([
    { id: 'root', path: '/', element: <App /> }
  ])

  return <RouterProvider router={routes}></RouterProvider>
}

export default Router
