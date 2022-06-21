import React from "react";
import PageGlobalWrapper from "../../Global/PageGlobalWrapper/PageGlobalWrapper";
import { MainContainer } from "../../Global/StyledComponents/MainContainer";
import AsideLeft from "./AsideLeft/AsideLeft";
import AsideRight from "./AsideRight/AsideRight";
import Header from "./Header/Header";
import Main from "./Main/Main";
import NavBar from "./NavBar/NavBar";

const DashboardIndex = () => {
  return (
    <>
      <PageGlobalWrapper>
        <Header />
        <NavBar />
        <MainContainer>
          <AsideLeft />
          <Main/>
          <AsideRight />
        </MainContainer>
      </PageGlobalWrapper>
    </>
  );
};

export default DashboardIndex;
