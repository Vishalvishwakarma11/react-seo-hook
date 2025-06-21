# 🔍 react-seo-hook

Welcome to **react-seo-hook**!  
A lightweight React hook to manage SEO metadata—like titles, meta tags, canonical URLs, and social media tags—effortlessly and dynamically with full support for **React Router**.

Perfect for blogs, e-commerce platforms, or any React app that needs some SEO love.

---

## ✨ Why use react-seo-hook?

- ✅ Easy to use  
- ⚡ Fast and lightweight  
- 🔗 Fully integrated with React Router  
- 🧠 Automatically syncs metadata with your current route  
- 🚀 Boosts SEO and improves social media previews  

Say goodbye to manual `<head>` edits—**react-seo-hook** updates it for you on the fly.

---

## 📦 Installation

Using npm:

```bash
npm install react-seo-hook
```

Using Yarn:

```bash
yarn add react-seo-hook
```

> **Peer dependencies required:**
> ```bash
> npm install react react-dom react-router-dom
> ```

---

## 💻 Usage

### `useDocumentMeta` Hook

Dynamically update the document’s metadata for each route.

```tsx
import { useDocumentMeta } from 'react-seo-hook';
import { BrowserRouter } from 'react-router-dom';

function App() {
  useDocumentMeta({
    title: 'My Awesome App',
    description: 'A sample app with dynamic SEO metadata.',
    keywords: 'react, seo, metadata',
    canonicalUrl: 'https://myapp.com',
    ogImage: 'https://myapp.com/og-image.jpg',
  });

  return <div>Your App Content</div>;
}

function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Root;
```

This will automatically update your `<head>` with:
```html
<title>My Awesome App</title>
<meta name="description" content="A sample app with dynamic SEO metadata." />
<meta name="keywords" content="react, seo, metadata" />
<link rel="canonical" href="https://myapp.com" />
<!-- Open Graph & Twitter tags -->
<meta property="og:image" content="https://myapp.com/og-image.jpg" />
<meta name="twitter:image" content="https://myapp.com/og-image.jpg" />
```

---

### 🌐 Dynamic Routes Example

Works perfectly with `react-router-dom`'s route parameters:

```tsx
import { useDocumentMeta } from 'react-seo-hook';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';

function DynamicPage() {
  const { id } = useParams();

  useDocumentMeta({
    title: `Page ${id}`,
    description: `Explore page ${id} of our awesome app.`,
    keywords: `page, ${id}, react, seo`,
    canonicalUrl: `https://myapp.com/page/${id}`,
    ogImage: 'https://myapp.com/og-image.jpg',
  });

  return <div>Page {id} Content</div>;
}

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/page/:id" element={<DynamicPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
```

---

## 📖 API

The `useDocumentMeta` hook accepts a configuration object:

| Property       | Type     | Required | Description                                     |
|----------------|----------|----------|-------------------------------------------------|
| `title`        | string   | ✅       | Sets the document title                         |
| `description`  | string   | ✅       | Meta description for SEO                        |
| `keywords`     | string   | ✅       | Comma-separated SEO keywords                    |
| `canonicalUrl` | string   | ✅       | Canonical URL to prevent duplicate content      |
| `ogImage`      | string   | ❌       | Image URL for Open Graph and Twitter Card tags  |

---

## 🛠 Development

Want to contribute or customize? Clone the repo and set up locally:

```bash
git clone https://github.com/Vishalvishwakarma11/react-seo-hook.git
cd react-seo-hook
npm install
```

### Run tests:

```bash
npm run test
```

### Build the package:

```bash
npm run build
```

---

## 🤝 Contributing

I’m always open to improvements, fixes, or enhancements.  
Feel free to open an issue or submit a pull request on [GitHub](https://github.com/Vishalvishwakarma11/react-seo-hook).

---

## 📜 License

Licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for more details.

---

## 🌐 Connect with Me

Let’s talk code, React, or SEO!

- GitHub: [@Vishalvishwakarma11](https://github.com/Vishalvishwakarma11)
- LinkedIn: [Vishal Vishwakarma](https://linkedin.com/in/vishal-vishwakarma-472365215)

---

Thanks for checking out **react-seo-hook**!  
Let’s make the web more SEO-friendly together. 🎉
