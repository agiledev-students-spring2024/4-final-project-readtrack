const mongoose = require('mongoose');
const User = require('./src/models/User');
const Book = require('./src/models/Book');
const bcrypt = require("bcryptjs");
require('dotenv').config();

// MongoDB connection string
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB from populateDB.js!');
        populateDB();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const saltRounds = 10;
async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

// Save sample books to MongoDB
const saveBooks = async (books) => {
    await Book.deleteMany({});
    for (const book of books) {
        await book.save();
    }
};

// Save sample users to MongoDB
const saveUsers = async (users) => {
    await User.deleteMany({});
    for (const user of users) {
        await user.save();
    }
};

const populateDB = async () => {
    try {
        const hashedPasswordSample = await hashPassword('123');

        const books = [
            new Book({
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                description: "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.",
                genres: ["Fiction", "Drama"],
                publishedDate: "1960",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL28434561M-M.jpg"
            }),
            new Book({
                title: "Pride and Prejudice",
                author: "Jane Austen",
                description: "The romantic clash of two opinionated people in the backdrop of the English countryside.",
                genres: ["Romance", "Fiction"],
                publishedDate: "1813",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL24300356M-M.jpg"
            }),
            new Book({
                title: "The Catcher in the Rye",
                author: "J.D. Salinger",
                description: "The story of a young man's adventures in Manhattan as he grows into early manhood from the vantage of his prep school.",
                genres: ["Fiction", "Bildungsroman"],
                publishedDate: "1951",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL7298105M-M.jpg"
            }),
            new Book({
                title: "Brave New World",
                author: "Aldous Huxley",
                description: "A dystopian novel set in a futuristic world state of genetically-modified citizens and an intelligence-based social hierarchy.",
                genres: ["Dystopian", "Science Fiction"],
                publishedDate: "1932",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL1563571M-M.jpg"
            }),
            new Book({
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                description: "Bilbo Baggins embarks on a journey to help a group of dwarves reclaim their mountain home from a dragon named Smaug.",
                genres: ["Fantasy", "Adventure"],
                publishedDate: "1937",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL30290052M-M.jpg"
            }),
            new Book({
                title: "Sapiens: A Brief History of Humankind",
                author: "Yuval Noah Harari",
                description: "Exploring the ways in which biology and history have defined us and enhanced our understanding of what it means to be 'human'.",
                genres: ["Non-fiction", "History"],
                publishedDate: "2011",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL28149694M-M.jpg"
            }),
            new Book({
                title: "Life of Pi",
                author: "Yann Martel",
                description: "A young boy survives a disaster at sea and is hurtled into an epic journey of adventure and discovery.",
                genres: ["Fiction", "Adventure"],
                publishedDate: "2001",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL13122365M-M.jpg"
            }),
            new Book({
                title: "The Alchemist",
                author: "Paulo Coelho",
                description: "A philosophical book that tells the story of Santiago, a young shepherd on his journey to Egypt, after having a recurring dream of finding treasure there.",
                genres: ["Fiction", "Quest", "Fantasy"],
                publishedDate: "1988",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL24368792M-M.jpg"
            }),
            new Book({
                title: "Frankenstein",
                author: "Mary Shelley",
                description: "The story of Victor Frankenstein, a young scientist who creates a grotesque but sentient creature in an unorthodox scientific experiment.",
                genres: ["Horror", "Science Fiction"],
                publishedDate: "1818",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL27696522M-M.jpg"
            }),
            new Book({
                title: "The Road",
                author: "Cormac McCarthy",
                description: "A novel of a father and son's journey through a post-apocalyptic landscape, struggling to survive through a barren America.",
                genres: ["Fiction", "Post-Apocalyptic"],
                publishedDate: "2006",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL8873678M-M.jpg"
            }),
            new Book({
                title: "The Handmaid's Tale",
                author: "Margaret Atwood",
                description: "A dystopian novel about a future where women are subjugated and controlled by a totalitarian regime.",
                genres: ["Dystopian", "Fiction"],
                publishedDate: "1985",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL26434283M-M.jpg"
            }),
            new Book({
                title: "Murder on the Orient Express",
                author: "Agatha Christie",
                description: "Detective Hercule Poirot faces a thrilling murder mystery on the snowy Orient Express train.",
                genres: ["Mystery", "Crime"],
                publishedDate: "1934",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL24368979M-M.jpg"
            }),
            new Book({
                title: "Beloved",
                author: "Toni Morrison",
                description: "A haunting and powerful exploration of a mother's tragic choice during the American slave era.",
                genres: ["Historical Fiction", "Literature"],
                publishedDate: "1987",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL24762136M-M.jpg"
            }),
            new Book({
                title: "A Brief History of Time",
                author: "Stephen Hawking",
                description: "A landmark volume in science writing by one of the great minds of our time, exploring the nature of the universe.",
                genres: ["Science", "Non-fiction"],
                publishedDate: "1988",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL22045249M-M.jpg"
            }),
            new Book({
                title: "The Name of the Wind",
                author: "Patrick Rothfuss",
                description: "A high-fantasy novel following the journey of a magically gifted young man growing to be the most notorious wizard his world has ever seen.",
                genres: ["Fantasy", "Adventure"],
                publishedDate: "2007",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL7820723M-M.jpg"
            }),
            new Book({
                title: "Gone Girl",
                author: "Gillian Flynn",
                description: "A thriller that unearths the secrets at the heart of a modern marriage.",
                genres: ["Thriller", "Mystery"],
                publishedDate: "2012",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL26282386M-M.jpg"
            }),
            new Book({
                title: "Thinking, Fast and Slow",
                author: "Daniel Kahneman",
                description: "A tour of the mind and explains the two systems that drive the way we think and make choices.",
                genres: ["Psychology", "Non-fiction"],
                publishedDate: "2011",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL25303582M-M.jpg"
            }),
            new Book({
                title: "American Gods",
                author: "Neil Gaiman",
                description: "A novel blending Americana, fantasy, and various strands of ancient and modern mythology.",
                genres: ["Fantasy", "Mythology"],
                publishedDate: "2001",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL6794865M-M.jpg"
            }),
            new Book({
                title: "The Book Thief",
                author: "Markus Zusak",
                description: "The story of a young girl living with her adoptive German family during the Nazi era. Taught to read by her kind-hearted foster father, she begins borrowing books and sharing them with the Jewish refugee sheltered in their basement.",
                genres: ["Historical Fiction", "Literature"],
                publishedDate: "2005",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL3292724M-M.jpg"
            }),
            new Book({
                title: "Never Let Me Go",
                author: "Kazuo Ishiguro",
                description: "A dystopian science fiction novel that explores the lives of children at a boarding school who are destined to be organ donors.",
                genres: ["Dystopian", "Science Fiction"],
                publishedDate: "2005",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL3422097M-M.jpg"
            }),
            new Book({
                title: "Invisible Man",
                author: "Ralph Ellison",
                description: "A novel that delves deep into the social and psychological problems faced by African Americans in the early 20th century.",
                genres: ["Fiction", "Social Issues"],
                publishedDate: "1952",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL27170094M-M.jpg"
            }),
            new Book({
                title: "Dune",
                author: "Frank Herbert",
                description: "A science fiction saga of a young man's journey to avenge a traitorous plot against his noble family and to bring to fruition humankind's most ancient and unattainable dream.",
                genres: ["Science Fiction", "Adventure"],
                publishedDate: "1965",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL7955126M-M.jpg"
            }),
            new Book({
                title: "The Catch-22",
                author: "Joseph Heller",
                description: "A satirical war novel set during World War II, where the protagonist struggles with the absurdity of war and bureaucracy.",
                genres: ["Satire", "Historical Fiction"],
                publishedDate: "1961",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL26325566M-M.jpg"
            }),
            new Book({
                title: "Wuthering Heights",
                author: "Emily Brontë",
                description: "A dark romance that explores destructive passions and unrequited love between Heathcliff and Catherine.",
                genres: ["Gothic", "Romance"],
                publishedDate: "1847",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL28049312M-M.jpg"
            }),
            new Book({
                title: "Crime and Punishment",
                author: "Fyodor Dostoevsky",
                description: "A psychological drama that explores morality, guilt, and redemption through the story of a destitute former student who plans to murder a pawnbroker for her money.",
                genres: ["Philosophical Fiction", "Psychological Thriller"],
                publishedDate: "1866",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL7198838M-M.jpg"
            }),
            new Book({
                title: "The Sun Also Rises",
                author: "Ernest Hemingway",
                description: "The story of American and British expatriates who travel from Paris to the Festival of San Fermín in Pamplona to watch the running of the bulls and the bullfights.",
                genres: ["Fiction", "Modernism"],
                publishedDate: "1926",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL24376551M-M.jpg"
            }),
            new Book({
                title: "The Grapes of Wrath",
                author: "John Steinbeck",
                description: "An epic story that captures the hardship and struggle of American families during the Dust Bowl migration of the 1930s.",
                genres: ["Historical Fiction", "Social Issues"],
                publishedDate: "1939",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL23278083M-M.jpg"
            }),
            new Book({
                title: "Midnight's Children",
                author: "Salman Rushdie",
                description: "A deep, delightful dive into India's history, seen through the eyes of a young man born at the very moment of India's independence.",
                genres: ["Historical Fiction", "Magical Realism"],
                publishedDate: "1981",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL7467800M-M.jpg"
            }),
            new Book({
                title: "The Adventures of Sherlock Holmes",
                author: "Arthur Conan Doyle",
                description: "A collection of twelve detective stories featuring the famous detective Sherlock Holmes and his faithful assistant Dr. Watson.",
                genres: ["Mystery", "Crime Fiction"],
                publishedDate: "1892",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL26465595M-M.jpg"
            }),
            new Book({
                title: "One Hundred Years of Solitude",
                author: "Gabriel García Márquez",
                description: "The multi-generational story of the Buendía family, whose patriarch, José Arcadio Buendía, founded the town of Macondo, a fictitious town in the country of Colombia.",
                genres: ["Magical Realism", "Fiction"],
                publishedDate: "1967",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL6147090M-M.jpg"
            }),
            new Book({
                title: "Les Misérables",
                author: "Victor Hugo",
                description: "A French historical novel that examines the nature of law and grace, following the lives and interactions of several characters, particularly focusing on the struggles of the protagonist—ex-convict Jean Valjean.",
                genres: ["Historical Fiction", "Classic"],
                publishedDate: "1862",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL1563571M-M.jpg"
            }),
            new Book({
                title: "The Count of Monte Cristo",
                author: "Alexandre Dumas",
                description: "A story of wrongful imprisonment, adventure, and revenge. It follows the life of Edmond Dantès, a young man betrayed on the eve of his wedding and thrown into a dark prison cell for 14 years.",
                genres: ["Adventure", "Classic"],
                publishedDate: "1844",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL24380640M-M.jpg"
            }),
            new Book({
                title: "Great Expectations",
                author: "Charles Dickens",
                description: "The story of an orphan named Pip, detailing his personal development as he grows from a young boy into a gentleman, influenced by a mysterious group of benefactors.",
                genres: ["Classic", "Bildungsroman"],
                publishedDate: "1861",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL26228783M-M.jpg"
            }),
            new Book({
                title: "War and Peace",
                author: "Leo Tolstoy",
                description: "A narrative that follows the personal lives of several families and characters during the French invasion of Russia, showing how major historical events affect individual lives.",
                genres: ["Historical Fiction", "Classic"],
                publishedDate: "1869",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL24376551M-M.jpg"
            }),
            new Book({
                title: "A Tale of Two Cities",
                author: "Charles Dickens",
                description: "Set in London and Paris before and during the French Revolution, the novel tells the story of a French doctor's release from long imprisonment and the complexities of his relationship with a British aristocrat.",
                genres: ["Historical Fiction", "Classic"],
                publishedDate: "1859",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL1069759M-M.jpg"
            }),
            new Book({
                title: "The Old Man and the Sea",
                author: "Ernest Hemingway",
                description: "The story of an aging Cuban fisherman who struggles with a giant marlin far out in the Gulf Stream off the coast of Florida.",
                genres: ["Literature", "Fiction"],
                publishedDate: "1952",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL24335040M-M.jpg"
            }),
            new Book({
                title: "Catch-22",
                author: "Joseph Heller",
                description: "A satirical novel about American airmen during World War II, exploring the absurdity of war and military life through the experiences of Captain John Yossarian and others.",
                genres: ["Satire", "War"],
                publishedDate: "1961",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL26325566M-M.jpg"
            }),
            new Book({
                title: "East of Eden",
                author: "John Steinbeck",
                description: "A multi-generational novel set in California's Salinas Valley, this work follows the complex relationships between two families, the Trasks and the Hamiltons, echoing the biblical story of Cain and Abel.",
                genres: ["Epic", "Fiction"],
                publishedDate: "1952",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL24335040M-M.jpg"
            }),
            new Book({
                title: "The Trial",
                author: "Franz Kafka",
                description: "A posthumously published novel about a man arrested and prosecuted by a remote, inaccessible authority, with the nature of his crime revealed neither to him nor the reader.",
                genres: ["Absurdist", "Fiction"],
                publishedDate: "1925",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL10703386M-M.jpg"
            }),
            new Book({
                title: "Mansfield Park",
                author: "Jane Austen",
                description: "Following the life of Fanny Price as she navigates the complex social labyrinths of early 19th century English society, this novel explores themes of status, marriage, and morality.",
                genres: ["Classic", "Romance"],
                publishedDate: "1814",
                coverUrl: "https://covers.openlibrary.org/b/olid/OL10703386M-M.jpg"
            })
        
        ];
        await saveBooks(books);

        const users = [
            new User({
                fullname: "John Doe",
                username: "john_doe",
                email: "john.doe@example.com",
                password: hashedPasswordSample,
                books: {
                    currentlyReading: [books[0]._id],
                    finishedReading: [books[2]._id],
                    wishlist: [books[1]._id],
                    favorites: [books[0]._id, books[1]._id]
                }
            }),
            new User({
                fullname: "Jane Smith",
                username: "jane_smith",
                email: "jane.smith@example.com",
                password: hashedPasswordSample,
                books: {
                    currentlyReading: [books[2]._id],
                    finishedReading: [books[1]._id],
                    wishlist: [books[0]._id],
                    favorites: [books[1]._id]
                }
            })
        ];

        // await saveUsers(users);
        console.log('Database populated successfully');
    } catch (error) {
        console.error('Error populating database:', error);
    } finally {
        setTimeout(() => {
            mongoose.connection.close()
                .then(() => {
                    console.log('Disconnected from MongoDB');
                    process.exit(0);
                })
                .catch((error) => {
                    console.error('Error disconnecting from MongoDB:', error);
                    process.exit(1);
                });
        }, 1000); // Delay the disconnection by 1 second (adjust as needed)
    }
};

module.exports = { populateDB };