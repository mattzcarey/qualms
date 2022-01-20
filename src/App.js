import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom';
import axios from 'axios'
import Header from './components/Header'
import Data from './components/Data'
import theme from './theme';
import routes from './routes';


const App = () => {

  
  const routing = useRoutes(routes());
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {
        // this is if you want to use useRoutes()
        routing


      //   <Router>
      //     <AuthProvider>
      //       <NavPage/>
      //       <Routes>
      //         npms 
      //         <Route exact path="/">
      //           <MainPage/> 
      //         </Route>
      //         <Route path="/about"></Route>
      //       </Routes>
      //       </AuthProvider>
      //  </Router> 
      }
    </ThemeProvider>
  );
}

export default App;
