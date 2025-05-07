import { useCallback, useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import LoadingPage from '../pages/Loading';
import useAuthStore from '../stores/auth';
import useLoadingStore from '../stores/loading';
import AuthServices from '../services/auth';

const PublicRoute = ({ redirectTo = undefined }) => {
    const [user, setUser] = useState(null);
    const [, setError] = useState(null);
    const [isFetchingUser, setIsFetchingUser] = useState(true);

    // hooks
    const authUser = useAuthStore(state => state.authUser);
    const setAuthUser = useAuthStore(state => state.setAuthUser);
    const isLoading = useLoadingStore(state => state.isLoading);
    const setIsLoading = useLoadingStore(state => state.setIsLoading);

    // callbacks
    const fetchActiveUserCB = useCallback(async () => {
        try {
            const fetchUserData = await AuthServices.active();

            if (fetchUserData.success) setUser(fetchUserData.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
            setIsFetchingUser(false);
        }

        // eslint-disable-next-line
    }, []);

    // effects

    useEffect(() => {
        setIsFetchingUser(isLoading);
    }, [isLoading]);

    useEffect(() => {
        if (user) setAuthUser(user);

        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        fetchActiveUserCB();
    }, [fetchActiveUserCB]);

    useEffect(() => {
        if (user) setAuthUser(user);
    }, [user, setAuthUser]);

    useEffect(() => {
        setIsLoading(isFetchingUser || isLoading);

        // eslint-disable-next-line
    }, [isFetchingUser, isLoading]);

    if (isFetchingUser || isLoading) return <LoadingPage />;

    if ((user || authUser) && redirectTo)
        return <Navigate to={redirectTo} replace />;

    return <Outlet />;
};

export default PublicRoute;
