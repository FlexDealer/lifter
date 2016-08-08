# Lifter
Simple popup library with no dependencies  

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


## Options
```javascript
var lifter = new Lifter({
	base : '.container-fluid',
	triggers : '.popup',
	preload : true
});
```


| Option | Type   | Default | Description |
|--------|--------|---------|-------------|
| **base** | string | `'body'` | Selector for the parent element.  All popup triggers must be children of this element. This is also the element that is darkened while a popup is open. |
| **triggers** | string | `'[target=_popup]'` | Selector for the triggers that open popups. |
| **preload** | boolean or string | `true` | Whether to load the popup content in hidden `<iframes>`. If a string selector is given then only triggers that match the selector will be preloaded. |



## Popup Sizing

The default size of the popup is 50% of the total width and height of the base element.
This can be changed per popup in a two different ways.

**Setting popup size with classes**

To use a small or large variant of the popup you can add a class to the trigger.
| Size | Class | Effect |
|------|-------|--------|
| small | `lifter-sm` | width and height set to `30%` |
| large | `lifter-lg` | width and height set to `80%` |

```html
<a href="//domain.com/page.html" target="_popup" class="lifter-lg">Pop this up huge</a>
```


**Setting popup size with data attributes**

To have more control over the size of your popup you can use one of these data attributes:

`data-width` `data-height` `data-size`


You can use any CSS size unit (`px`, `%`, `em`, `vw` ...) in the value of the attribute.
| Dimension | Attribute | Value Format | Example |
|-----------|-----------|--------|---------|
| width | `data-width` | `{width}{unit}` | `data-width="500px"` |
| height | `data-height` | `{height}{unit}` | `data-height="40vh"` |
| width and height | `data-size` | `{width}{unit}|{height}{unit}` | `data-size="75%|450px"` |

_Note:_ `data-size` will overwrite `data-width` or `data-height` if both are set on a trigger element.
