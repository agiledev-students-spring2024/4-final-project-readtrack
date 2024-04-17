import React, { useState, useEffect } from "react";
import BookShelf from "../components/bookshelf";

const FriendProfile = () => {
  const placeholder = "https://via.placeholder.com/100";
  // atm am using lots of the code from profile.js
  // also, not connected via friends list yet

  return (
    <div className="w-screen">
      {/* PROFILE HEADER */}
      <div className="flex flex-col px-4 my-10">
        <div className="flex flex-row mb-4 justify-between">
          <img
            src={placeholder}
            alt="Profile"
            className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
          />

          <div className="flex flex-col justify-center">
            <p>Alice</p>
            <p>@alice</p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="pt-1">
              <p className="text-xs tracking-tight text-center inline-block w-full bg-goodreads-gray hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-sm transition duration-100 ease-in-out">
                Add friend
              </p>
            </div>
            <div className=" text-sm py-1">
              <p>10 Friends</p>
            </div>
          </div>
        </div>

        {/* Profile Bio */}
        <div className="flex flex-row px-6 py-4 text-left">
          <div className="text-sm">
            <p>
              Bio: Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Vero atque tempora quam
            </p>
          </div>
        </div>
      </div>

      {/* PROFILE BODY */}
      <div>
        <BookShelf title="Current Reads" />
        <BookShelf title="Wishlist" />
        <BookShelf title="Past Reads" />
      </div>
    </div>
  );
};

export default FriendProfile;
