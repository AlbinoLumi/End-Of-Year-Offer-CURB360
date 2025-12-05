# WordPress Embed Instructions

## Method 1: Seamless Full-Width Embed (RECOMMENDED - No Double Scrollbars)

### For WordPress Block Editor (Gutenberg):

1. Add a **Custom HTML** block to your page
2. Paste the following code:

```html
<div style="width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; overflow: hidden;">
  <iframe 
    src="https://end-of-year-offer-curb-360.vercel.app/" 
    width="100%" 
    height="100vh" 
    frameborder="0" 
    scrolling="no"
    style="border: none; display: block; min-height: 100vh; overflow: hidden;"
    title="CURB360 End of Year Offer"
    id="curb360-embed">
  </iframe>
</div>
<script>
(function() {
  var iframe = document.getElementById('curb360-embed');
  if (iframe) {
    // Remove scrollbars from iframe
    iframe.style.overflow = 'hidden';
    
    // Make iframe height match content
    function resizeIframe() {
      try {
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        var height = Math.max(
          iframeDoc.body.scrollHeight,
          iframeDoc.body.offsetHeight,
          iframeDoc.documentElement.clientHeight,
          iframeDoc.documentElement.scrollHeight,
          iframeDoc.documentElement.offsetHeight
        );
        iframe.style.height = height + 'px';
      } catch (e) {
        // Cross-origin restriction - use viewport height
        iframe.style.height = '100vh';
      }
    }
    
    iframe.onload = function() {
      resizeIframe();
      setInterval(resizeIframe, 500);
    };
    
    // Listen for resize events
    window.addEventListener('resize', resizeIframe);
  }
})();
</script>
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

## Method 3: Simple Full-Width (No Script - Fixed Height)

If the script method doesn't work, use this simpler version:

```html
<div style="width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; overflow: hidden; height: 100vh;">
  <iframe 
    src="https://end-of-year-offer-curb-360.vercel.app/" 
    width="100%" 
    height="100%" 
    frameborder="0" 
    scrolling="no"
    style="border: none; display: block; height: 100vh; overflow-y: auto; overflow-x: hidden;"
    title="CURB360 End of Year Offer">
  </iframe>
</div>
```

## Notes:

- After deploying the `vercel.json` configuration, wait a few minutes for Vercel to update
- The iframe will automatically resize based on the content
- Make sure your WordPress theme allows iframes (most do by default)
- If you see a blank iframe, check browser console for any CORS or security errors


