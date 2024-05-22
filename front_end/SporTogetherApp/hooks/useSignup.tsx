import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState<Boolean | null>(null);
    const { dispatch } = useAuthContext();

    const signup = async (username: string, email: string, password: string) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch('http://localhost:56789/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })
        const json = await response.json();
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        } else {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }
    }

    return { signup, isLoading, error };
}