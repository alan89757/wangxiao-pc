import BreadStore from "../store/breadCrumb";
//
export function handleBread(data: any) {
  const temp = BreadStore.getPageData();
  temp.push(data);
  BreadStore.setPageData(temp);
  //   navigate("/AllInformation");
}
