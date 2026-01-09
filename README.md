# 📄 Xorvik CV Generator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?logo=tailwind-css&logoColor=white)
![Powered by Gemini](https://img.shields.io/badge/AI-Google_Gemini-8E75B2?logo=google&logoColor=white)

**Xorvik CV Generator** is a high-performance, AI-powered resume builder designed to help users create professional, ATS-friendly CVs in minutes. Leveraging the power of **Google Gemini**, it offers intelligent content enhancement and real-time previews across multiple stunning templates.

---

## ✨ Key Features

### 🧠 AI-Powered Intelligence
*   **Auto-Summarizer:** Generate a professional profile summary based on your job title and name with one click.
*   **Experience Enhancer:** Transform basic job descriptions into impactful, results-driven bullet points using Gemini AI.

### 🎨 Beautiful Design & UX
*   **Real-Time Preview:** Watch your CV transform instantly as you edit.
*   **Multiple Templates:** Choose from **Modern**, **Sidebar**, and **Classic** layouts to suit your industry.
*   **Custom Sections:** Add flexible "Others" sections for Projects, Awards, or Volunteering (supports both paragraphs and bullet points).

### ⚡ Technical Excellence
*   **React 19:** Built on the latest version of React for optimal performance.
*   **Print-Perfect:** CSS optimized specifically for A4 PDF export via browser print.
*   **Responsive:** seamless editing experience on both desktop and mobile devices.

---

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript, Vite
*   **Styling:** Tailwind CSS
*   **AI Integration:** Google GenAI SDK (`@google/genai`)
*   **Icons:** Lucide React
*   **Fonts:** Inter (Google Fonts)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v18 or higher recommended)
*   A Google Cloud Project with the **Gemini API** enabled.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kmochy013/XORVIK-CV-Generator.git
    cd XORVIK-CV-Generator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    You need a valid Google Gemini API Key.
    
    *   Open the file `env.txt` (or create a `.env` file).
    *   Copy the content and replace the placeholder with your key:
        ```
        VITE_API_KEY=your_google_gemini_api_key_here
        ```
    *   If using **Vercel**, go to Settings > Environment Variables and paste the content there.

4.  **Run the application:**
    ```bash
    npm run dev
    ```

---

## 📖 Usage Guide

1.  **Select a Template:** Use the sidebar to switch between Modern, Sidebar, or Classic layouts.
2.  **Fill Details:** Enter your personal info, experience, and education.
3.  **Use AI Magic:**
    *   Click the **✨ Auto-Generate** button in the Profile section to create a summary.
    *   Click the **🪄 Enhance** button next to any experience description to polish your writing.
4.  **Add Custom Sections:** Scroll down to "Additional Sections" to add generic blocks like "Certifications" or "Hobbies".
5.  **Export:** Click the **Download PDF** button.
    *   *Note:* Ensure "Background Graphics" is enabled and margins are set to "None" or "Minimum" in the print dialog.

---

## 🖼️ Templates Overview

| **Modern** | **Sidebar** | **Classic** |
|:---:|:---:|:---:|
| Clean, minimalist design focused on readability. | distinctive left-column layout for skills and contact info. | Traditional, timeline-based layout perfect for corporate roles. |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ by Xorvik Engineering</sub>
</div>