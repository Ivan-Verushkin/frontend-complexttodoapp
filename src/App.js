import Navigation from './Navigation';
import UserProvider from './UserProvider';

function App() {
  return (
    <UserProvider>
        <Navigation />
    </UserProvider>
  );
}

export default App;
