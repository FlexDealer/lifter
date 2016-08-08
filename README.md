# Lifter
Simple popup library with no dependancies  

## Implementation
**CSS**
```html
<link rel="stylesheet" href="/lifter/dist/lifter.min.css" />
```  
**JavaScript**
```html
<script src="/lifter/dist/lifter.min.js"></script>
```



## Usage

**Basic**
```html
<a href="//domain.com/page.html" target="_popup">Pop this up</a>
```

```javascript
var lifter = new Lifter();
```


**Inline Content**
```html
<div id="popup-content" style="display:none;">
	<form action="/submit" method="POST">
    	<input type="email" name="email" placeholder="Email address" /><br />
        <input type="password" name="password" placeholder="Password" /><br />
        <button type="submit">Log In</button>
    </form>
</div>

<a target="_popup" data-content="#popup-content">Log In</a>
```
```javascript
var lifter = new Lifter({
	preload : ':not([data-content])'
});
```


### Options
```javascript
var lifter = new Lifter({
	base : '.container-fluid',
	triggers : '.popup',
	preload : true
});
```


| option | type   | default | description |
|--------|--------|---------|-------------|
| **base** | string | `'body'` | Selector for the parent element.  All popup triggers must be children of this element. This is also the element that is darkened while a popup is open. |
| **triggers** | string | `'[target=_popup]'` | Selector for the triggers that open popups. |
| **preload** | boolean or string | `true` | Whether to load the popup content in hidden `<iframes>`. If a string selector is given then only triggers that match the selector will be preloaded. |
