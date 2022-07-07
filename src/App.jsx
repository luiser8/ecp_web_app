import { ContextProvider } from './auth/Context';
import RoutesCustom from './helpers/RoutesCustom';
import Layout from './pages/layouts/Layout';

function App() {
  return (
    <ContextProvider>
        <Layout />
    </ContextProvider>
  );
}

export default App;
