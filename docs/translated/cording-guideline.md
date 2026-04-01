# Coding Guideline
Follow rules as closely as possible.
For sites or landing pages that won't be updated frequently, minor rule modifications are permitted.

## Directory Structure Example

```
root
  ┣ assets/
  ┃   ┣ _include/
  ┃   ┃   ┣ setings.php // Define constants and other shared utilities
  ┃   ┃   ┗ ...
  ┃   ┣ scss/
  ┃   ┃   ┗ ...
  ┃   ┣ css/
  ┃   ┃   ┗ ...
  ┃   ┣ img/
  ┃   ┃   ┣ common/ // Shared icons, etc.
  ┃   ┃   ┣ about/ // Create a directory for each page
  ┃   ┃   ┃ ┗ history/
  ┃   ┃   ┗ ...
  ┃   ┣ js/
  ┃   ┃   ┗ ...
  ┃   ┣ font/ // Web fonts
  ┃   ┃   ┗ ...
  ┃   ┣ data/ // PDFs, JSON, CSV, and other non-image files
  ┃   ┃   ┗ ...
  ┃   ┗ ...
  ┣ about/ // Create a directory for each page
  ┃   ┣ index.html
  ┃   ┣ history/
  ┃   ┃ ┗ index.html
  ┃   ┗ ...
  ┣ contact/
  ┃   ┗ index.html
  ┗ index.html // Top page (sample includes _template.php)
```

## HTML
- Indentation: 2 spaces
- Use PHP file splitting as needed, loading from the assets/_include directory
    - Set up a PHP environment with XAMPP or Docker as appropriate
    - If using VS Code, install "PHP Server"
        - brapifra.phpserver
    - If setting up a local environment is difficult, HTML is acceptable
- Add clear prefixes to image filenames wherever possible
    - Icons: icon_~
    - Backgrounds: bg_~
    - Banners: banner_~
    - Main visuals: mv_~
    - Text rendered as images: text_~
    - Other items that don't fit above: img_~
    - Example: Section-specific images
    img_(section class name, etc.)_~
- Use semantic HTML
    - Set the representative heading of each page as h1, and use sections to divide content
    - Each section should contain headings (h2 or below) and text
    - Avoid overusing br tags; split content appropriately with p tags
    - For decorative images, an empty alt attribute is acceptable
- Use the picture source media attribute when images change per breakpoint
- Common elements (header, footer, etc.) should be managed with a single source code, unless the design makes this impossible (to prevent missed link settings and update omissions)
```
<!-- Bad: PC and SP have 2 separate sources -->
<header class="l-header">
  <nav class="l-header__nav--pc">
    <ul>
      <li><a href="">...</a></li>
      <li><a href="">...</a></li>
    </ul>
  </nav>
  <nav class="l-header__nav--sp">
    <ul>
      <li><a href="">...</a></li>
      <li><a href="">...</a></li>
    </ul>
  </nav>
</header>
```
```
<!-- Good: Use a single source unless the design makes it impractical -->
<header class="l-header">
  <nav>
    <ul>
      <li><a href="">...</a></li>
      <li><a href="">...</a></li>
    </ul>
  </nav>
</header>
```

## CSS
- Indentation: 2 spaces
- Use Sass; compiler: Dart Sass; syntax: SCSS
- If using VS Code, install "Live Sass Compiler"
    - glenn2223.live-sass
- Use // comments as the default; use /**/ only when comments need to persist after compilation
- Organize by role in a layered structure
    - Foundation → Layout → Object → Component → Project → Utility
- Use BEM notation as the base; name classes by "role/structure" rather than "meaning"
    - If a list can be reused generically, do not include meaning in the name
    .c-faqList1 Bad .c-list1 Good
    - Exception for Utility classes
    .u-cRed1 .u-bdcBlue1 ...
- Minimize global CSS and prioritize reusable parts

### Directory Structure Example
```
root
  ┣ assets/
  ┃   ┣ scss/
  ┃   ┃   ┣ foundation/
  ┃   ┃   ┃   ┣ _variables.scss
  ┃   ┃   ┃   ┗ ...
  ┃   ┃   ┣ layout/
  ┃   ┃   ┃   ┣ _base.scss
  ┃   ┃   ┃   ┗ ...
  ┃   ┃   ┣ object/
  ┃   ┃   ┃   ┣ component/ // Buttons, forms, etc.
  ┃   ┃   ┃   ┃   ┣ _btn.scss
  ┃   ┃   ┃   ┃   ┣ _form.scss
  ┃   ┃   ┃   ┃   ┗ ...
  ┃   ┃   ┃   ┣ project/ // Page-specific, limited layouts
  ┃   ┃   ┃   ┃   ┣ _about.scss
  ┃   ┃   ┃   ┃   ┣ _about-history.scss // Use hyphens for parent-child relationships
  ┃   ┃   ┃   ┃   ┗ ...
  ┃   ┃   ┃   ┗ utility/
  ┃   ┃   ┃       ┣ _color.scss // color, border-color, etc.
  ┃   ┃   ┃       ┣ _display.scss // display, overflow, etc.
  ┃   ┃   ┃       ┣ _typography.scss // Web font specification, font-size, line-height, etc.
  ┃   ┃   ┃       ┣ _space.scss // margin, padding, etc.
  ┃   ┃   ┃       ┣ _jsutil.scss // CSS overrides for JS plugins
  ┃   ┃   ┃       ┗ ...
  ┃   ┃   ┣ plugins.scss // CSS for JS plugins and other third-party code (import as minified by default)
  ┃   ┃   ┗ style.scss // Main import file
  ┃   ┣ css/
  ┃   ┃   ┗ ... // Compiled CSS
```

### Naming Convention Examples
Use prefixes to clarify roles and prevent class name collisions.

- Foundation: Reset CSS, variables, mixins, functions, etc.
    - Example: _variables.scss _reset.scss _mixins.scss _functions.scss
- Layout: Site-wide shared elements such as header, footer, grid, etc.
    - Example: _base.scss
        - Write CSS applied to generic selectors like html, body
    - Example: _header.scss _footer.scss _grid.scss _container.scss
        - .l-header1 .l-header1__nav
        .l-footer1 .l-footer1__copy
        l-grid1 l-grid1__item .l-container1
- Object/Component: Reusable components
    - Example: _btn.scss _card.scss _form.scss
    - .c-btn1 .c-btn1__link
    .c-card1 .c-card1__caption
    .c-form1 .c-form1__input1 .c-form1__radio1
- Object/Project: Limited layouts, overriding components is permitted
    - Example: _top.scss _about.scss
    - .p-top .p-top__mv .p-top__block1
    .p-about .p-about__table1
- Object/Utility: Fine-tuning styles and single-purpose overrides
    - _color.scss
        - Text, border, background colors, etc.
        - .u-cRed1 .u-bdcBlue1
    - _spase.scss
        - Spacing: margin, padding, etc.
        - .u-mt1em .u-my20em .u-pl1em .u-px15em
    - _jsutil.scss
        - CSS overrides for JS plugins
        - .js-toggle .js-modal

### Coding Rules
- Indentation: 2 spaces
- Selector depth: 2 levels maximum as a rule
    - Be especially careful with components, as increased specificity makes overriding in projects difficult
- ID selectors are prohibited; use classes consistently
    - IDs are permitted only when needed for JS manipulation
- Avoid !important as much as possible
    - Exception: permitted in Utility classes
- Use variables for colors and font sizes
    - \$color-main1 \$color-gray1
- Do not add px-based font-size, line-height, margin, padding, etc. to Utility; keep it lean
    - Use rem or em as the default units, and omit decimal points in naming
    - Example: padding-top: 1.5rem; → u-pt15rem
    font-size: 1rem; → u-fs1rem
- When overriding third-party CSS such as plugins, consolidate in _jsutil.scss

### Comment Rules
```
// ========================================
// Component: Button
// ========================================
.c-btn {
  display: inline-block;
  padding: 0.5em 1em;
  border-radius: 4px;
}
```

### Operational Notes
- Prioritize reuse: First, incorporate new styles into Components
- Page-specific styles go in Project: Limit styles not used on other pages to Project
- Keep Utility minimal: Overuse makes management difficult; only add highly versatile ones
- Review class naming and hierarchy appropriateness
- When designs change, update Components for reuse

## JavaScript
- Indentation: 2 spaces
- Use vanilla JS by default; do not use jQuery (to reduce maintenance effort)
    - Plugin usage is permitted as needed
- Remove or comment out debug code like console.log after testing

### Directory Structure Example
```
root
  ┣ assets/
  ┃   ┣ js/
  ┃   ┃   ┣ plugins.js // JS plugins and other third-party code (import as minified by default)
  ┃   ┃   ┣ top.js // Create per-page JS files when page-specific scripts are needed
  ┃   ┃   ┗ common.js // Consolidate shared utility functions
```
