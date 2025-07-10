# React Chat App (Test Assignment)

A frontend chat application with chatbot elements, built to showcase skills in a modern tech stack. The UI is designed to be a pixel-perfect replica of the provided [Figma design](https://www.figma.com/design/vVRiigEkDdsizG0r4dg3JI/Chat-UI-kit--Community---Copy-?node-id=2-2&p=f&t=vofE21EJjG3Ybbq1-0). Idea was taken from [Test assignment](https://joytechnology.notion.site/Frontend-0868814b407f4df690942907143362d8)

---

## ✨ Live Demo

**[View Live Demo ➔](https://chatbot-one-murex.vercel.app/)**

---

## 📸 Screenshots

|                 Light Theme                 |                Dark Theme                 |
| :-----------------------------------------: | :---------------------------------------: |
| ![Light Theme](/screenshots/light_mode.jpg) | ![Dark Theme](/screenshots/dark_mode.jpg) |

|                 Image Attachment                  |              Image Save mode               |
| :-----------------------------------------------: | :----------------------------------------: |
| ![Image Attachment](/screenshots/image_attch.jpg) | ![Image Save](/screenshots/image_save.jpg) |

Edit Mode
![Edit Mode](/screenshots/edit_mode.jpg)

---

## 🚀 Features

- **Full Message CRUD:**
  - [x] Sending messages via Enter key or button click
  - [x] Editing user's own messages
  - [x] Deleting user's own messages
  - [x] Deleting all messages in chat
- **Interactivity:**
  - [x] Bot reply with a simulated delay
  - [x] Animated "Janet is typing..." indicator
  - [x] Smooth enter/exit animations for messages using **Framer Motion**
  - [x] Auto-scrolling to the latest message
- **Media Handling:**
  - [x] Attaching images (PNG, JPG, WEBP) with type and size validation
  - [x] Image preview in a modal with the ability to add a caption
  - [x] Viewing sent images in a full-screen with a download option
- **User Interface:**
  - [x] Responsive design that displays correctly on all devices
  - [x] Dynamic theme switching (light/dark) with persistence
  - [x] Solved Flash of Incorrect Theme (FOIT) on page load
  - [x] Solved Cumulative Layout Shift (CLS) on input render
  - [x] Custom animated icons matching the Figma design
- **State and Data:**
  - [x] Persisting message history and theme choice in `localStorage`
  - [x] Centralized state management with **Zustand**
- **Testing:**
  - [x] Unit tests for Zustand store logic
  - [x] Integration tests for key user flows (sending messages, bot replies)

---

## 🛠️ Tech Stack

- **Framework:** React 19, Next.js 15+ (App Router)
- **Language:** TypeScript
- **State Management:** Zustand
- **UI Components:** Ant Design
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion

### Tooling & Code Quality

- **Linter:** ESLint
- **Formatter:** Prettier
- **Git Hooks:** Husky
- **Pre-commit checks:** lint-staged
  **Pre-push Checks:** Running the full test suite with `npm run test`
- **Testing:** Vitest, React Testing Library

---

## 💡 Architectural Decisions

- **Solving Flash of Incorrect Theme (FOUC/FOIT):** To prevent a flash of the wrong theme on initial load, a blocking inline script is used in the `<head>` to apply the correct theme class (`.dark`) before React hydration, based on `localStorage` or OS preference.

- **Solving Layout Shift (CLS):** The dynamic-height text input component is loaded using `next/dynamic` with `{ ssr: false }`. This ensures the component only renders on the client-side, immediately calculating its final size and completely eliminating any layout shift.

- **Smart vs. Dumb Component Separation:** The input logic was split into a "smart" container component (`InputComponent`), which handles state and actions, and a "dumb," reusable "core" component (`MessageInputCore`), which is only responsible for the UI and receives all data and handlers via props. This allowed the core to be reused in two different contexts: the main input and the image attachment modal.

- **Justified Icon Choice:** To achieve 100% consistency with the Figma design, custom SVG icons were exported from the design file instead of using the Ant Design Icons library, which lacked an exact match for all required icons.

---

## ⚙️ Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/antonina220590/chatbot.git
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.
