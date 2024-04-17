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
        const token = localStorage.getItem('token');

        if (bookId && token) {
            fetch(`http://localhost:3001/api/books/${bookId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not okay');
                    }
                    return response.json();
                })
                .then(data => {
                    setBook(data);
                })
                .catch(error => {
                    console.error('Error fetching book:', error);
                });
        }
    }, [bookId]);

    if (!book) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen b">
            <Header title={`${book.title} by ${book.author || 'Unknown Author'}`} />
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-cover bg-center p-4 flex justify-center">
                        <img
                            src={book.coverUrl || "https://picsum.photos/400/600"}
                            alt={book.title}
                            className="rounded-lg w-40 md:w-auto md:max-h-96 object-cover"
                        />
                    </div>
                    <div className="md:w-2/3 p-4">
                        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                        <p className="italic mb-4">by {book.author || 'Unknown Author'}</p>
                        <p className="mb-4"><span className="font-semibold">Description:</span> {book.description || 'No description available'}</p>
                        <p className="mb-4"><span className="font-semibold">Pages:</span> {book.pages || 'Unknown'}</p>
                        <p className="mb-4"><span className="font-semibold">Genres:</span> {book.genres ? book.genres.join(', ') : 'Unknown'}</p>
                        <p className="mb-4"><span className="font-semibold">First Published:</span> {book.publishedDate || 'Unknown'}</p>
                        {loggedInUser && (
                            <div className="grid grid-cols-3 gap-4">
                                <CurrentlyReading userId={loggedInUser._id} bookId={bookId} />
                                <ReadingFinished userId={loggedInUser._id} bookId={bookId} />
                                <ReadingWishlist userId={loggedInUser._id} bookId={bookId} />
                            </div>
                        )}
                        <div className="pt-4">
                            <h3 className="text-xl font-bold mb-2">Ratings</h3>
                            <div className="bg-gray-200 p-4 rounded-lg">
                                <p className="mb-2"><span className="font-bold">Alice's Rating:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <p><span className="font-bold">Bob's Rating:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
