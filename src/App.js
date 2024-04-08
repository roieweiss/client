import React, { useState } from 'react';
import CardList from "./components/CardList";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPage from './components/SearchPage';

function App() {
  const [showCardList, setShowCardList] = useState(true);
  const [showSearchPage, setShowSearchPage] = useState(true);

  const divStyle = {
    display: 'flex',
    flexDirection: 'column', // Arrange children vertically
    justifyContent: 'flex-start', // Align children to the start of the main axis (top)
    backgroundImage: `url('https://img.freepik.com/free-vector/global-recognised-credit-card-concept-background_1017-36206.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px',
  };

  const headerStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px',
    marginBottom: '20px', // Add some margin to separate the header from the rest of the content
  };

  const handleToggleCardList = () => {
    setShowCardList(!showCardList);
    setShowSearchPage(true); // Show SearchPage when CardList is toggled
  };

  const handleToggleSearchPage = () => {
    setShowSearchPage(!showSearchPage);
    setShowCardList(true); // Show CardList when SearchPage is toggled
  };

  return (
    <div style={divStyle}>
      <header style={headerStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handleToggleCardList}>Toggle CardList</button>
          <button onClick={handleToggleSearchPage}>Toggle SearchPage</button>
        </div>
      </header>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {showCardList && <CardList />}
        {showSearchPage && <SearchPage />}
      </div>
      {/* Content below the header */}
    </div>
  );
}

export default App;
