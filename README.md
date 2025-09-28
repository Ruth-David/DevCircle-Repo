# DevCircle Portfolio Website

A professional, responsive portfolio website for DevCircle - a web design team based in Nairobi CBD, Kenya.

## 🚀 Features

- **Fully Responsive**: Mobile-first design with breakpoints for all devices
- **Modern Design**: Clean, professional aesthetic with blue and yellow branding
- **Performance Optimized**: Fast loading with lazy loading and optimized assets
- **SEO Ready**: Complete meta tags, schema.org markup, and sitemap
- **Accessible**: WCAG AA compliant with proper ARIA labels and keyboard navigation
- **Interactive Elements**: Carousels, lightboxes, accordions, and smooth animations
- **Content Management**: Easy-to-update JSON files for all dynamic content

## 📁 Project Structure

```
/
├── index.html              # Homepage
├── services.html           # Services page
├── about.html             # About us page
├── portfolio.html         # Portfolio/work showcase
├── pricing.html           # Pricing packages
├── blog.html              # Blog listing
├── faq.html               # Frequently asked questions
├── contact.html           # Contact form and info
├── 404.html               # Error page
├── /assets/
│   ├── /img/              # Images and graphics
│   └── /video/            # Video files
├── /css/
│   ├── base.css           # Variables, reset, typography
│   ├── layout.css         # Grid, header, footer, sections
│   └── components.css     # Buttons, cards, forms, etc.
├── /js/
│   ├── main.js            # Core functionality
│   ├── data-loader.js     # JSON content loading
│   ├── carousel.js        # Carousel components
│   ├── filters.js         # Blog/portfolio filtering
│   ├── form.js            # Form validation
│   └── lightbox.js        # Portfolio lightbox
├── /data/
│   ├── services.json      # Services content
│   ├── portfolio.json     # Portfolio projects
│   ├── pricing.json       # Pricing packages
│   ├── posts.json         # Blog posts
│   ├── faq.json           # FAQ items
│   └── team.json          # Team members
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Search engine instructions
├── favicon.ico            # Site icon
└── README.md              # This file
```

## 🎨 Customization

### Colors

The color scheme is defined in CSS variables in `css/base.css`:

```css
:root {
    --brand-blue: #2563eb;
    --brand-yellow: #f59e0b;
    /* ... other colors */
}
```

To change colors, simply update these variables.

### Typography

Fonts are loaded from Google Fonts:
- **Headings**: Poppins (300, 400, 500, 600, 700)
- **Body**: Inter (300, 400, 500, 600)

To change fonts, update the Google Fonts link in each HTML file and the CSS variables.

### Content Management

All dynamic content is stored in JSON files in the `/data/` directory:

#### Adding a New Service (`data/services.json`)
```json
{
    "id": "new-service",
    "title": "New Service",
    "description": "Service description",
    "icon": "🎯",
    "image": "assets/img/service-new.jpg",
    "features": ["Feature 1", "Feature 2"],
    "starting_price": "KES 25,000"
}
```

#### Adding a Portfolio Project (`data/portfolio.json`)
```json
{
    "id": 1,
    "title": "Project Name",
    "description": "Project description",
    "category": "Web Design",
    "image": "assets/img/portfolio-new.jpg",
    "tags": ["Tag1", "Tag2"],
    "client": "Client Name",
    "year": "2025",
    "technologies": ["React", "Node.js"],
    "results": "Project results and impact"
}
```

#### Adding a Blog Post (`data/posts.json`)
```json
{
    "id": 7,
    "title": "New Blog Post",
    "slug": "new-blog-post",
    "excerpt": "Post excerpt",
    "content": "Full post content",
    "featured_image": "assets/img/blog-new.jpg",
    "author": "Author Name",
    "published_date": "2025-01-15",
    "tags": ["Tag1", "Tag2"],
    "category": "Category",
    "reading_time": 5
}
```

#### Adding a Team Member (`data/team.json`)
```json
{
    "name": "New Member",
    "role": "Position",
    "bio": "Member bio",
    "photo": "assets/img/team-new.jpg",
    "social": {
        "linkedin": "https://linkedin.com/in/username",
        "twitter": "https://twitter.com/username"
    }
}
```

#### Adding FAQ Item (`data/faq.json`)
```json
{
    "question": "New question?",
    "answer": "Detailed answer to the question."
}
```

#### Adding Pricing Package (`data/pricing.json`)
```json
{
    "name": "Package Name",
    "price": "KES 75,000",
    "period": "one-time",
    "description": "Package description",
    "features": ["Feature 1", "Feature 2"],
    "featured": false,
    "cta": "Get Started"
}
```

## 📧 Contact Form Setup

The contact form requires backend integration. Choose one of these options:

### Option 1: Formspree (Recommended)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Update `js/form.js` line 150 with your Formspree endpoint

### Option 2: EmailJS
1. Sign up at [emailjs.com](https://emailjs.com)
2. Set up your email service and template
3. Update `js/form.js` with your EmailJS configuration

### Option 3: Custom Backend
Implement your own backend API and update the form submission URL in `js/form.js`.

## 🗺️ Map Integration

The contact page includes a Google Maps embed. To customize:

1. Go to [Google Maps](https://maps.google.com)
2. Search for your location
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the iframe in `contact.html`

## 📱 Social Media Links

Update social media links in the footer of each HTML file:
- Facebook: `https://www.facebook.com/devcircle`
- Instagram: `https://www.instagram.com/devcircle`
- LinkedIn: `https://www.linkedin.com/company/devcircle`
- TikTok: `https://www.tiktok.com/@devcircle`

## 🚀 Deployment

### Static Hosting (Recommended)
- **Netlify**: Drag and drop the entire folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to a GitHub repository and enable Pages
- **Firebase Hosting**: Use Firebase CLI to deploy

### Traditional Hosting
Upload all files to your web server's public directory (usually `public_html` or `www`).

## 🔧 Development

### Local Development
1. Use a local server (e.g., Live Server extension in VS Code)
2. Or use Python: `python -m http.server 8000`
3. Or use Node.js: `npx serve .`

### File Organization
- Keep images under 500KB for optimal performance
- Use WebP format for better compression when possible
- Optimize images before adding to `/assets/img/`

## 📊 Analytics & SEO

### Google Analytics
Add your Google Analytics tracking code to each HTML file before the closing `</head>` tag.

### Search Console
1. Verify your site with Google Search Console
2. Submit the sitemap: `https://yoursite.com/sitemap.xml`

### Schema.org
The site includes structured data for:
- Organization information
- Local business details
- Contact information

## 🛠️ Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is created for DevCircle. All rights reserved.

## 🤝 Support

For technical support or customization requests:
- WhatsApp: [+254 743 750 237](https://wa.me/254743750237)
- Email: info@devcircle.co.ke
- Phone: +254 743 750 237

---

**DevCircle** - Professional Web Design Team | Nairobi CBD, Kenya