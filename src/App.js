import './App.css';
import Sidebar from './components/sidebar/sidebar';
import Courseinfo from './components/courseinfo/courseinfo';
import ToDoList from './components/todolist/todolist';
import PageHeader from './components/pageheader/pageheader';

const App = () => {
  return (
    <div className="App">
      <PageHeader />
      <div className="horizontalcontainer"> {/* Added this container */}
        <Sidebar />
        <Courseinfo />
        <ToDoList />
      </div>
    </div>
  );
}

export default App;
