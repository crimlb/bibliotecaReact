import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import FooterBiblioteca from '../components/FooterBiblioteca';

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">

      <header>
        <Navbar />
      </header>

      <ScrollToTop />

      <main className="flex-grow-1 main-content">
        <Outlet />
      </main>



      <FooterBiblioteca />

    </div>
  );
}

export default MainLayout;
