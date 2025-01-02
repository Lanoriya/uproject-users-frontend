import './App.css'
import { UserPage } from './components/user-page/UserPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<UserPage />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
