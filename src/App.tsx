import { useEffect, useState } from "react";
import {Form, Header,PokemonForm} from "./components/"
function App() {
  const [page,setPage] = useState(1)
  const pageClickHandler=(nextPage:number)=>{
    //user can only go back to previous page
    console.log("nextPage",nextPage)
    if (nextPage<page){
      setPage(nextPage)
      localStorage.setItem("page",nextPage.toString())
    }
  }
  useEffect(()=>{
    let page = localStorage.getItem("page")??"1"
    setPage(Number(page))
  },[])
  const PageContent = ()=>{
    if (page===1)
    return <Form
    setPage={setPage}
    />
    if (page===2)
    return <PokemonForm/>

    return <></>
  }
  return (
    <div className="w-screen h-screen flex ">
      <div className="max-w-4xl m-auto ">
        <Header 
        page={page}
        setPage={pageClickHandler}
        />
      <PageContent/>
      </div>
      
    </div>
  );
}

export default App;
