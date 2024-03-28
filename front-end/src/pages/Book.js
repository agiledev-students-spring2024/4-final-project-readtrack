import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import CurrentlyReading from './CurrentlyReading';
import ReadingFinished from './ReadingFinished';
import ReadingWishlist from './ReadingWishlist';
import ReadingProgress from './ReadingProgress';

const BookPage = ({ loggedInUser }) => {
    const [book, setBook] = useState(null);
    const { bookId } = useParams();

    useEffect(() => {
        if (bookId) {
            fetch(`http://localhost:3001/books/${bookId}`)
                .then(response => response.json())
                .then(data => {
                    setBook(data);
                })
                .catch(error => {
                    console.error('Error fetching book:', error);
                });
        }
    }, [bookId]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bookInfo">
            <Header title={`${book.title} by ${book.author || 'Unknown Author'}`} />
            <div className="bg-custom-gradient">
                <div className="flex items-center justify-center pb-5">
                    <img
                        src={book.coverUrl || "https://picsum.photos/400/600"}
                        alt={book.title}
                        className="w-40 h-60 object-cover border-2"
                    />
                </div>
                <div className="px-10 pb-5">
                    <b>Description</b>
                    <p className="text-sm">{book.description || 'No description available'}</p>
                </div>
                <div className="px-10 pb-5">
                    <b>Details</b>
                    <p className="text-xs">Pages: {book.pages || 'Unknown'}</p>
                    <p className="text-xs">Genres: {book.genres ? book.genres.join(', ') : 'Unknown'}</p>
                    <p className="text-xs">First Published: {book.publishedDate || 'Unknown'}</p>
                </div>
                {loggedInUser && (
                    <div className="px-10 pb-5 mx-8">
                        <div className='mx-2'>
                            <CurrentlyReading userId={loggedInUser.id} bookId={bookId} />
                        </div>
                        <div className='mx-2'>
                            <ReadingFinished userId={loggedInUser.id} bookId={bookId} />
                        </div>
                        <div className='mx-2'>
                            <ReadingWishlist userId={loggedInUser.id} bookId={bookId} />
                        </div>
                    </div>
                )}
                <div className="px-10 pb-5">
                    <b>Ratings</b>
                    <div className="flex items-center justify-center">
                        <div className="bg-gray-200 p-4 m-2 w-70 text-xs">
                            <span className="font-bold">Alice's: </span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            <br></br> <br></br>
                            <span className="font-bold">Bob's: </span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookPage;