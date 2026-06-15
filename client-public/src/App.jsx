import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BaseLayout from './views/BaseLayout';
import Home from './views/Home';
import Detail from './views/Detail';
import Login from './views/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path='detail/:id' element={<Detail />} />
          <Route path='/login' element={<Login />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;