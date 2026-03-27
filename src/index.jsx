import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, resetKey: 0 };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error('APP CRASH:', error, info);
  }
  handleReset = () => {
    this.setState(s => ({ error: null, resetKey: s.resetKey + 1 }));
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{padding:40, fontFamily:'monospace', background:'#fff', color:'#c00', minHeight:'100vh'}}>
          <h2 style={{marginBottom:16}}>💥 Error de carga</h2>
          <pre style={{whiteSpace:'pre-wrap', fontSize:13, background:'#fff3f3', padding:20, borderRadius:8, border:'1px solid #fcc', marginBottom:20}}>
            {this.state.error.toString()}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
          <button
            onClick={this.handleReset}
            style={{background:'#e8417a',color:'#fff',border:'none',padding:'10px 24px',borderRadius:8,fontSize:14,cursor:'pointer',fontWeight:700}}
          >
            🔄 Reintentar
          </button>
        </div>
      );
    }
    return <App key={this.state.resetKey} />;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

