import './App.scss';
import { AppProvider } from './context/app.context';
import HomePage from './pages/home';

const App = () => {
  return (
    <AppProvider >
      <HomePage />
    </AppProvider>
  );
}

export default App;
