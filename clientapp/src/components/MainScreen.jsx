import React, { Component } from "react";
import logo from "../assets/svg/nba_logo.svg";
import MainScreenSlider from "./MainScreenSlider";
const MainScreen = function () {
  return (
    <>
      <img
        className="w-217 h-307 absolute top-[39px] left-[31px]"
        src={logo}
        alt="Nba Logo"
      />

      <h1 className="text-[53px] text-center font-calibri text-nba-lightgray mt-[76px]">
        NBA Management System
      </h1>
      <h3 className="text-[32px] text-nba-darkgray text-center font-sans mt-[20px]">
        Welcome to use this NBA Management system, you can <br /> redirect to
        different pages according to your role by clicking the buttons bellow.
      </h3>
      <div className="w-[801px] h-[373px] border-nba-border border-2 mt-[58px] flex items-center justify-between pl-[88px] pr-[88px]">
        <button
          type="button"
          className="text-white white text-[36px] bg-nba-blue pr-[67px] pl-[67px] pt-[32px] pb-[34px]"
        >
          Visitor
        </button>
        <button
          type="button"
          className="text-white text-[36px] bg-nba-blue pr-[67px] pl-[67px] pt-[32px] pb-[34px]"
        >
          Admin
        </button>
      </div>
      <MainScreenSlider />
    </>
  );
};

export default MainScreen;