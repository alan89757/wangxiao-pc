import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import CourseDetail from "@/pages/CourseDetail";
import AllInformation from "@/pages/AllInformation";
import PersonalCenter from "@/pages/PersonalCenter";
import InfoDetail from "@/pages/InfoDetail";
import AllCourse from "@/pages/AllCourse/allCourse";
import MainLayout from "@/pages/Layout/index";

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/courseDetail/:id"
          element={
            <MainLayout>
              <CourseDetail />
            </MainLayout>
          }
        />
        <Route
          path="/allInformation"
          element={
            <MainLayout>
              <AllInformation />
            </MainLayout>
          }
        />
        <Route
          path="/infoDetail"
          element={
            <MainLayout styles={{backgroundColor: '#F4F6F8'}}>
              <InfoDetail />
            </MainLayout>
          }
        />
        <Route
          path="/personalCenter"
          element={
            <MainLayout styles={{backgroundColor: '#F4F6F8'}}>
              <PersonalCenter />
            </MainLayout>
          }
        />
        <Route
          path="/allCourse/:type/:id"
          element={
            <MainLayout>
              <AllCourse />
            </MainLayout>
          }
        />
        <Route
          path="*"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default Router;
