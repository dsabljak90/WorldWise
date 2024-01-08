import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import CityList from './components/CityList'
import City from './components/City'
import SpinnerFullPage from './components/SpinnerFullPage'
import Form from './components/Form'
import CountryList from './components/CountryList'
import {CitiesProvider} from './context/CitiesContext'
//import {AuthProvider} from './context/authContext'
//import ProtectedRoute from './pages/ProtectedRoute';

/* import HomePage from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
 */

const HomePage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const AppLayout = lazy(() => import('./pages/AppLayout'));


function App() {
  return (
    <CitiesProvider>
      {/*  <AuthProvider> */}
      <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage/>}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='login' element={<Login />} />
            {/* <Route path='app' element={<ProtectedRoute><AppLayout /></ProtectedRoute>}> */}
            <Route path='app' element={<AppLayout />}>
            <Route index element={<Navigate replace to={'cities'} />} />
            <Route path='cities' element={<CityList />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='countries' element={<CountryList />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='*' element={<PageNotFound />} /> {/*  * this will catch all routes which are not matching the defined routes */}
        </Routes>
        </Suspense>
      </BrowserRouter>
      {/*  </AuthProvider> */}
    </CitiesProvider>
  )
}

export default App
