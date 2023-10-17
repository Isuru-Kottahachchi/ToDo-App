
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import TodoList from './components/TodoList';
import { TodoProvider } from './store/TodoContext';


function App() {

  return (
    <TodoProvider>
      <div className="App">
        <Header />
        <Body />
        <TodoList />
      </div>
    </TodoProvider>

  );
}

export default App;
