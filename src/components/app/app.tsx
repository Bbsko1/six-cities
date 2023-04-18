import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from '../main/main';
import Login from '../login/login';
import Property from '../property/property';
import Favorites from '../favorites/favorites';
import Header from '../header/header';
import cards from '../../mock/mock';


function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Main cards={cards} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='/offer/:id' element={<Property />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
