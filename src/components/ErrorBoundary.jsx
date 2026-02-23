import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('💥 ERREUR REACT CAPTURÉE:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    background: '#0a0f1e',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontFamily: 'sans-serif',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#f87171' }}>
                        Une erreur s'est produite
                    </h1>
                    <p style={{ color: '#94a3b8', marginBottom: '1rem', maxWidth: '500px' }}>
                        {this.state.error?.message || 'Erreur inconnue'}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 2rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Recharger la page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
