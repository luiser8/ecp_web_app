import { ContextProvider } from './auth/Context';
import Layout from './pages/layouts/Layout';

function App() {
  return (
    <ContextProvider>
        <Layout />
    </ContextProvider>
  );
}

export default App;
