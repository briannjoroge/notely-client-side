# Notely App (Client Side)

Notely is a simple note-taking web application built with React and TypeScript. This repository contains the client-side code, which provides the user interface and interacts with the backend server.

## Features

- User authentication (login, register, update profile, change password)
- Create, edit, delete, and restore notes
- Responsive design for desktop and mobile
- Avatar upload and profile management
- Toast notifications for user feedback

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/briannjoroge/notely-client-side.git

   cd notely-client-side
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up API variables:**

   - Set up API URLs in the API folder. Replace it with your backend URL running in the server.

4. **Start the development server:**

   ```sh
   npm run dev
   ```

   - The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

```
src/
  ├── api/           # API calls to backend
  ├── assets/        # Images and static files
  ├── components/    # Reusable UI components
  ├── pages/         # Main app pages (Home, Notes, Profile, etc.)
  ├── store/         # State management (Zustand)
  ├── theme/         # Material UI theme setup
  ├── App.tsx        # Main app component
  └── main.tsx       # Entry point
```

## Usage

- Register a new account or log in with existing credentials.
- Create, edit, and delete notes.
- Restore deleted notes from the trash.
- Update your profile and change your password.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

**Need help?**  
If you have any questions or issues, feel free to open an issue or email me.

Contacts - [Email me](mailto:bankcash1450@gmail.com)

## Author

Made by [Brian Njoroge](https://github.com/briannjoroge)

Happy coding mate!!
