
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
 
 
import { ThemeProvider } from './components/theme-provider';
 
import './index.css'
import { Sidebar } from './components/sidebar';
import { DashboardPage } from './components/dashboard-page';
import { UsersPage } from './components/user-page';





export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
      
      <Routes>
        <Route
         path ="/"
          element=
          {<Sidebar/>
          }> 
            
        <Route path ="/dashboard" element={<DashboardPage/>} />
        <Route path="/users" element={<UsersPage/>}/>
        </Route>
      </Routes>
     </BrowserRouter>

    </ThemeProvider>

  )

}
export default App;

