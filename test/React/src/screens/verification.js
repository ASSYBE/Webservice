//
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Verification() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    React.useEffect(() => {
        const token = searchParams.get('token');
        const cin = searchParams.get('cin');

        if (!token || !cin) {
            navigate('/error?message=Paramètres manquants dans l\'URL'); // Redirection avec message d'erreur
            return;
        }

        fetch('/api/verifier', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ token, cin }),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.error) });
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    navigate('/accueil');
                } else {
                    setError("Erreur lors de la vérification");
                }
            })
            .catch(error => {
                setError(error.message || "Une erreur s'est produite lors de la requête.");
                navigate('/error?message=' + error.message);
            });
    }, [navigate, searchParams]);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return <div>Vérification en cours...</div>;
}

export default Verification;