# 📚 Digital Book Show

A modern digital library web application built with React and TypeScript that allows users to search, explore, and save books using real-time data from the Google Books API.

> Final Project — Web Development Advanced | ReDI School of Digital Integration | Spring 2026

---

## 🚀 Live Demo

> 

---

## ✨ Features

- 🔍 **Real-time book search** — search by title, author, or topic
- 📖 **Book detail page** — full info including description, rating, pages, and publisher
- ❤️ **Favourites system** — save books to a personal collection with localStorage persistence
- 📄 **Pagination** — browse results 12 books at a time
- 💀 **Skeleton loading states** — smooth loading experience
- ⚠️ **Error handling** — user-friendly error messages including API quota errors
- 📱 **Responsive design** — works on mobile, tablet, and desktop
- ✍️ **Book reviews** — leave personal notes and ratings on any book

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | UI component library |
| TypeScript | Type-safe development |
| Vite | Build tool and dev server |
| Tailwind CSS | Utility-first styling |
| React Router | Client-side navigation |
| React Hook Form | Form handling and validation |
| Google Books API | Real book data |

---

## 📁 Project Structure

```
src/
├── main.tsx                  # App entry point
├── App.tsx                   # Router and global providers
├── types/
│   └── book.ts               # TypeScript interfaces
├── services/
│   └── booksApi.ts           # Google Books API calls
├── context/
│   └── FavoritesContext.tsx  # Global favourites state
├── hooks/
│   ├── useBookSearch.ts      # Custom hook for search logic
│   └── use-debounce.ts       # Custom debounce hook
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── BookCard.tsx          # Book card component
│   ├── SearchBar.tsx         # Search input component
│   ├── ReviewForm.tsx        # Book review form
│   ├── Skeleton.tsx          # Loading placeholders
│   └── Footer.tsx            # Footer component
└── pages/
    ├── HomePage.tsx          # Home with featured books
    ├── SearchPage.tsx        # Search results with pagination
    ├── BookDetailPage.tsx    # Individual book details
    ├── FavoritesPage.tsx     # Saved books collection
    └── NotFoundPage.tsx      # 404 page
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm
- A Google Books API key ([get one here](https://console.cloud.google.com))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/digital-book-show.git
cd digital-book-show
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root of the project:
```
VITE_GOOGLE_BOOKS_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser at `http://localhost:5173`

### Build for production

```bash
npm run build
```

---

## 🔑 Key React Concepts Used

### useState & useEffect
Used throughout the app to manage loading states, book data, and side effects like API calls.

### Context API
`FavoritesContext` provides global favourites state to all components without prop drilling.

### Custom Hooks
- `useBookSearch` — encapsulates all search logic (fetch, loading, error, pagination)
- `useDebounce` — delays value updates to prevent excessive re-renders

### React Router
Multiple pages with clean URL structure:
- `/` — Home
- `/search?q=` — Search results
- `/book/:id` — Dynamic book detail
- `/favorites` — Saved collection

### React Hook Form
Used in `ReviewForm` for form validation and submission with minimal re-renders.

---

## 🤖 AI Usage Disclosure

In accordance with ReDI School's academic honesty policy, I used Claude (Anthropic) as a **learning aid and tutor** during this project.

**AI was used for:**
- Explaining React concepts (useEffect, Context API, TypeScript interfaces)
- Understanding why errors occurred
- Learning best practices and project structure
- Guidance on Vite configuration and setup

**AI was NOT used for:**
- Writing the actual component code
- Copy-pasting generated code without understanding it
- Replacing the learning process

---

## 🔮 Future Improvements

- [ ] Add Jest + React Testing Library tests
- [ ] Dark mode toggle
- [ ] User authentication and personal libraries
- [ ] Reading progress tracker
- [ ] Book recommendations based on favourites
- [ ] Better error handling for different HTTP status codes

---

## 📄 License

This project was built as a final project for ReDI School of Digital Integration.

---

*Built with ❤️ and a lot of ☕*
