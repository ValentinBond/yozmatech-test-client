import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { AuthPage } from './pages/AuthPage.tsx';
import { MainPage } from './pages/MainPage.tsx';
import { NotFoundPage } from './pages/NotFound.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  getAuthPagePath,
  getMainPagePath,
  getNotFoundPagePath,
} from './constants/paths.ts';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={getAuthPagePath()} replace />;
  }

  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={getAuthPagePath()} element={<AuthPage />} />
          <Route
            path={getMainPagePath()}
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route path={getNotFoundPagePath()} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={getNotFoundPagePath()} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
