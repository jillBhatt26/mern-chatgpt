import { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoadingPage from '../pages/Loading';

const ErrorPage = lazy(() => import('../pages/Error'));
const HomePage = lazy(() => import('../pages/Home'));
const LoginPage = lazy(() => import('../pages/Login'));
const SignupPage = lazy(() => import('../pages/Signup'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));
const PublicRoute = lazy(() => import('./PublicRoute'));

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Anyone can access */}
                <Route element={<PublicRoute />}>
                    <Route
                        path="*"
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <ErrorPage />
                            </Suspense>
                        }
                    />
                </Route>

                {/* Anyone can access but not authenticated users*/}
                <Route element={<PublicRoute redirectTo="/" />}>
                    <Route
                        path="/login"
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <LoginPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <SignupPage />
                            </Suspense>
                        }
                    />
                </Route>

                {/* Only authenticated users can access*/}
                <Route element={<PrivateRoute />}>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<LoadingPage />}>
                                <HomePage />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
