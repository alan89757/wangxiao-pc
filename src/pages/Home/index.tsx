import React,{useEffect} from "react";
import TopNav from "./TopNav";
import Recommend from "./Recommend";
import Information from "./Information";
import BreadStore from "../../store/breadCrumb";
function Home() {
  
  useEffect(()=> {
    // getcourse();
    BreadStore.setPageData([{title:'首页',href:'/'}]);
  }, [])
  return (
    <>
      <TopNav />
      <Recommend />
      <Information />
    </>
  );
}

export default Home;
