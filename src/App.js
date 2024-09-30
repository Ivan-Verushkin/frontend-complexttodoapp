import Navigation from './Navigation';
import UserProvider from './context/UserProvider';

function App() {
  return (
    <UserProvider>
        <Navigation />
    </UserProvider>
  );
}

export default App;
