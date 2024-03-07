import React from 'react';
import OneBook from './OneBook';

const BookKeep = (props) => {

    return (
        <div className="bookContainer">
            <div className="bookDividers">
                <div className="text-left">
                    {props.title}
                </div>

                <div class="flex overflow-x-scroll">
                    <div class="flex-1">
                        <OneBook> </OneBook>
                    </div>
                    <div class="contents">
                        <div class="flex-1"><OneBook> </OneBook> </div>
                        <div class="flex-1"><OneBook> </OneBook> </div>
                    </div>
                    <div class="flex-1"><OneBook> </OneBook> </div>
                </div>




            </div>
        </div>

    )

}

export default BookKeep