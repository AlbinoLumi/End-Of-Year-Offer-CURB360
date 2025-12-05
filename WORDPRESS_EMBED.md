# WordPress Embed Instructions

## Method 1: Using an iframe (Recommended)

### For WordPress Block Editor (Gutenberg):

1. Add a **Custom HTML** block to your page
2. Paste the following code:

```html
<div style="width: 100%; height: 100vh; min-height: 800px;">
  <iframe 
    src="https://end-of-year-offer-curb-360.vercel.app/" 
    width="100%" 
    height="100%" 
    frameborder="0" 
    scrolling="auto"
    style="border: none; min-height: 800px;">
  </iframe>
</div>
```

### For Classic Editor:

1. Switch to **Text/HTML** mode
2. Paste the same code above

### Responsive Version (Better for mobile):

```html
<div style="position: relative; width: 100%; padding-bottom: 150%; height: 0; overflow: hidden;">
  <iframe 
    src="https://end-of-year-offer-curb-360.vercel.app/" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    frameborder="0"
    scrolling="auto">
  </iframe>
</div>
```

## Method 2: Using WordPress Shortcode (if you have a shortcode plugin)

Create a shortcode in your theme's `functions.php`:

```php
function embed_curb360_offer() {
    return '<div style="width: 100%; height: 100vh; min-height: 800px;">
        <iframe 
            src="https://end-of-year-offer-curb-360.vercel.app/" 
            width="100%" 
            height="100%" 
            frameborder="0" 
            scrolling="auto"
            style="border: none; min-height: 800px;">
        </iframe>
    </div>';
}
add_shortcode('curb360_offer', 'embed_curb360_offer');
```

Then use `[curb360_offer]` anywhere in your content.

## Method 3: Full-width Embed (Recommended for landing pages)

```html
<div style="width: 100vw; margin-left: calc(-50vw + 50%); height: 100vh; min-height: 800px;">
  <iframe 
    src="https://end-of-year-offer-curb-360.vercel.app/" 
    width="100%" 
    height="100%" 
    frameborder="0" 
    scrolling="auto"
    style="border: none; min-height: 800px;">
  </iframe>
</div>
```

## Notes:

- After deploying the `vercel.json` configuration, wait a few minutes for Vercel to update
- The iframe will automatically resize based on the content
- Make sure your WordPress theme allows iframes (most do by default)
- If you see a blank iframe, check browser console for any CORS or security errors


