import './App.css';
import Graph from './components/Graph';
import Table from './components/Table';
import datas from './datas';

function App() {
  return (
    <div className="container text-center mt-5">
      <div class="row">
        <div className='col-md-6'>
          <Table datas={datas} />
        </div>
        <div className='col-md-6'>
          <Graph datas={datas} />
        </div>
      </div>
    </div>
  );
}

export default App;
