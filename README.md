react-seo-hook
A React hook for dynamically managing SEO metadata (title, meta tags, canonical URL) with React Router integration.

Installation
npm install react-seo-hook

Usage
useDocumentMeta Hook
Dynamically update document metadata based on the current route.

import { useDocumentMeta } from 'react-seo-hook';
import { BrowserRouter } from 'react-router-dom';

function App() {
useDocumentMeta({
title: 'My App',
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
