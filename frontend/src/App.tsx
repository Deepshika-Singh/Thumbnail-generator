import Navbar from './components/Navbar';
import Home from './pages/Home';
import SoftBackdrop from './components/SoftBackdrop';
import Footer from './components/Footer';
import LenisScroll from './components/lenis';
import { Routes,Route, useLocation } from 'react-router-dom';
import Generate from './pages/generate';
import MyGeneration from './pages/MyGeneration';
import YtPreview from './pages/YtPreview';
import Login from './components/Login';
import { useEffect } from 'react';
function App() {
	const{pathname}=useLocation();
	useEffect(()=>{
		window.scrollTo(0,0)
	},[pathname])
	return (
		<>
			<LenisScroll />
			<Navbar />
			<Routes>
				<Route path ="/" element={<Home/>}></Route>
				<Route path ="/generate" element={<Generate/>}></Route>
				<Route path ="/generate/:id" element={<Generate/>}></Route>
				<Route path ="/my-generation" element={<MyGeneration/>}></Route>
				<Route path ="/preview/:id"element={<YtPreview/>}></Route>
				<Route path ="/login" element={<Login/>}></Route>
			</Routes>
			<Footer />
			<SoftBackdrop />
		</>
	);
}
export default App;