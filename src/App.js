import Navigation from './Navigation';
import ToDoProvider from './context/ToDoProvider';
import UserProvider from './context/UserProvider';

function App() {
  return (
    <UserProvider>
      <ToDoProvider>
        <Navigation />
      </ToDoProvider>
    </UserProvider>
  );
}

export default App;
