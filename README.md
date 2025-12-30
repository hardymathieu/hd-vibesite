# Hardy.Digital - Professional Portfolio

Modern, minimalist portfolio website for Mathieu Hardy showcasing digital strategy and product consulting services.

## Features

- **Single-page design** with smooth scroll navigation
- **Interactive Jobs-to-be-Done visualization** - unique standout element
- **Fully responsive** - mobile-first design
- **Zero dependencies** - static HTML + Tailwind CSS via CDN
- **Fast loading** - optimized performance
- **SEO optimized** - meta tags and structured data

## Tech Stack

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- Hosted on GitHub Pages

## Structure

```
/
├── index.html              # Main page
├── assets/
│   ├── css/
│   │   └── style.css      # Custom styles
│   ├── js/
│   │   └── main.js        # Interactive features
│   └── images/            # Images and assets
└── README.md
```

## Sections

1. **Hero** - Introduction and call-to-action
2. **About** - Value proposition with JTBD framework
3. **Services** - Product consulting and digital strategy
4. **Clients** - Past clients showcase
5. **Avroy Tech** - Co-founder mention
6. **Contact** - Social links and messaging options

## Local Development

Simply open `index.html` in a browser. No build process required.

## Deployment

This site is deployed on GitHub Pages. Any push to the main branch will automatically update the live site.

## Customization

### Update Profile Photo
Replace the SVG placeholder in `index.html` (line ~90) with:
```html
<img src="assets/images/profile.jpg" alt="Mathieu Hardy" class="w-full h-full object-cover">
```

### Update Social Links
Edit the contact section in `index.html` to add your actual social media URLs and contact information.

### Update Colors
Modify color scheme in `assets/css/style.css` and Tailwind classes in `index.html`.

## The Standout Element

The **Interactive Jobs-to-be-Done Visualization** is the unique feature of this site. It's a custom SVG diagram that:
- Animates on page load
- Responds to user interaction
- Subtly pulses to draw attention
- Reinforces the JTBD methodology

## License

© 2025 Mathieu Hardy. All rights reserved.
