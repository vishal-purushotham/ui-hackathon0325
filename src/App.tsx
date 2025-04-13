import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import CategoryView from './pages/CategoryView';
import ThreadView from './pages/ThreadView';
import UserProfile from './pages/UserProfile';
import SearchResultsPage from './pages/SearchResultsPage';
// Import other pages as they are created
// import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryView />} />
          <Route path="/thread/:threadId" element={<ThreadView />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/search" element={<SearchResultsPage />} />
          {/* Define other routes here */}
          {/* <Route path="/thread/:threadId" element={<ThreadView />} /> */}
          {/* <Route path="/user/:userId" element={<UserProfile />} /> */}
          {/* Add a 404 Not Found route? */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
