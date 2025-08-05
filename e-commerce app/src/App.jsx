import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import {Provider} from "react-redux";
import cartStore from "./utils/cartStore";
import { Suspense } from "react";

//Route to components using Outlet from React router dom.
//Lazy load for better optimization using Suspense.

function App(){
  return(
    <Provider store={cartStore}>
    <Header/>
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet/>
    </Suspense>
    </Provider>
  )
}

export default App;