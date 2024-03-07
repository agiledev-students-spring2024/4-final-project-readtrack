import React from 'react';
import Header from '../components/header';
import CurrentlyReading from './CurrentlyReading';
import ReadingFinished from './ReadingFinished';
import ReadingWishlist from './ReadingWishlist';
import ReadingProgress from './ReadingProgress';

const BookPage = () => {
    // const placeholder = "https://placehold.co/400x600"; 
    const placeholder = "https://picsum.photos/400/600";
    return (
        <div className="bookInfo">
            <Header title="Title by Author" />
            <div className="bg-custom-gradient">
                <div className="flex items-center justify-center pb-5">

                    <img
                            src={placeholder}
                            alt="Profile"
                            className="w-40 h-60 object-cover border-2"
                    />
                </div>
                <div className="px-10 pb-5">
                    <b>Description</b> 
                    <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
                <div className="px-10 pb-5">
                    <b>Details</b> 
                    <p className="text-xs">Pages: 360</p>
                    <p className="text-xs">Genres: Horror, Mystery</p>
                    <p className="text-xs">First Published: June 26, 1993</p>
                </div>
                <div className="px-10 pb-5 mx-8">
                    <div className='mx-2'>
                        <CurrentlyReading />
                    </div>
                    <div className='mx-2'>
                        <ReadingFinished />
                    </div>
                    <div className='mx-2'>
                        <ReadingWishlist />
                    </div>
                </div>
                <div className="px-10 pb-5">
                    <b>Ratings</b>
                    <div className="flex items-center justify-center">
                        <div className="bg-gray-200 p-4 m-2 w-70 text-xs">
                            <span className="font-bold">Alice's: </span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            <br></br>
                            <br></br>
                            <span className="font-bold">Bob's: </span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookPage