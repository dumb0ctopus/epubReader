# Epub Reader Application

## Overview

This project is an open-source EPUB reader application built with React and [ePub.js](https://github.com/futurepress/epub.js). The goal of this project is to provide a customizable, user-friendly interface to read EPUB books in your web browser. With built-in themes and fonts, it aims to make the reading experience as pleasant as possible.

## Features

- **Customizable Fonts**: Select from a variety of Google Fonts including Georgia, Merriweather, Roboto, and Libre Baskerville to personalize your reading experience.
- **Themes**: Switch between three themes (Light, Sepia, and Dark) to adapt the reading environment to your comfort.
- **Table of Contents (TOC)**: A convenient TOC for easy navigation between book chapters.
- **Paginated Navigation**: Navigate through the book pages using the next and previous buttons.
- **Responsive Design**: The application is fully responsive and works seamlessly on different devices.

## Getting Started

### Prerequisites

Make sure you have the following tools installed on your development machine:

- [Node.js](https://nodejs.org/en/) (version 12 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/epub-reader-app.git
   cd epub-reader-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

   The application will be running at `http://localhost:3000`.

## Usage

- **EPUB Viewer**: Drag and drop an EPUB file or provide it via a URL to load it into the viewer.
- **Themes and Fonts**: Use the controls at the top of the screen to change the theme or font. The changes will be reflected instantly in the viewer.
- **Navigation**: Use the Table of Contents to jump to specific chapters, or navigate using the previous and next buttons.

## Components

### `EpubReader`

The core component that handles displaying the EPUB content.
- **Props**:
  - `epubData`: EPUB file data to be loaded.
  - `initialLocation`: The starting point within the book.
  - `onLocationChange`: Callback when the reading location changes.

### `TOCOverlay`

This component renders the Table of Contents (TOC) overlay, which allows users to navigate to different chapters.

## Customization

- **Adding Fonts**: The fonts available for users can be customized in the `handleFontChange` function within `EpubReader.js`. Additional Google Fonts can be imported in `EpubReader.css`.
- **Adding Themes**: You can add more themes by registering them in the `rendition.themes.register` method.

## Contributing

Contributions are welcome! If you have any ideas to improve the project or find a bug, feel free to open an issue or submit a pull request.

### Steps to Contribute

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature-branch`)
3. **Commit your changes** (`git commit -m 'Add some feature'`)
4. **Push to the branch** (`git push origin feature-branch`)
5. **Open a Pull Request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **[ePub.js](https://github.com/futurepress/epub.js)**: A fantastic library for reading EPUB files in JavaScript.
- **Google Fonts**: For providing an excellent collection of fonts to improve the reading experience.

## Contact

For questions or suggestions, please reach out by opening an issue on the GitHub repository.

---

Happy Reading! 📚

