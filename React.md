### NAMED EXPORT AND DEFAULT EXPORT

## Named Exports
Named exports allow you to export multiple values from a module. When importing, you must use the same name as the exported variable.

```javascript
export const PI = 3.14;

export function add(x, y) {
    return x + y;
}

import { PI, add } from './math.js';

console.log(PI); // Output: 3.14
console.log(add(2, 3)); // Output: 5
```

### Default Exports
    A default export allows you to export a single value or entity from a module. You can import it with any name.
```js
export default function greet(name) {
    return `Hello, ${name}!`;
}

import greet from './greet.js';

console.log(greet('Alice')); // Output: "Hello, Alice!"

```

=========================================================================================================
                                        HOOKS
=========================================================================================================
# useState Hook in React

## Overview
The `useState` hook is a fundamental hook in React that allows you to add state to functional components. It enables components to hold and manage their own state without needing to convert them into class components.

## Syntax
```javascript
const [state, setState] = useState(initialValue);
```
-------------------------------------------------

# useEffect Hook in React

## Overview
The `useEffect` hook is used in React functional components to perform side effects. Side effects can include data fetching, subscriptions, manual DOM manipulations, and more. It runs after the render phase and can be used for both mounting and updating the component.

## Syntax
```javascript
useEffect(() => {
    // Effect code

    return () => {
        // Cleanup code (optional)
    };
}, [dependencies]);
```
-------------------------------------------------------------------------------

# useReducer Hook in React

## Overview
The `useReducer` hook is an alternative to `useState` for managing state in React components. It is particularly useful for managing complex state logic or when the next state depends on the previous one. `useReducer` is based on the concept of reducers from Redux, allowing you to structure state updates in a more predictable way.

## Syntax
```javascript
import React, { useReducer } from 'react';

const initialState = { count: 0 };

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            return state;
    }
};

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </div>
    );
}

```


# useContext Hook in React

## Overview
The `useContext` hook is a built-in hook in React that allows you to access the value of a context directly within functional components. It simplifies the process of sharing values between components without needing to pass props down through multiple levels of the component tree.

## Creating Context

Before using `useContext`, you need to create a context using `React.createContext()`.

**Example: Creating a Context**

```javascript
import React, { useContext } from 'react';

const ThemeContext = React.createContext();

function App() {
    const theme = 'dark';

    return (
        <ThemeContext.Provider value={theme}>
            <Toolbar />
        </ThemeContext.Provider>
    );
}

function Toolbar() {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

function ThemedButton() {
    const theme = useContext(ThemeContext);

    return (
        <button style={{ background: theme === 'dark' ? '#333' : '#FFF', color: theme === 'dark' ? '#FFF' : '#000' }}>
            I am a {theme} themed button
        </button>
    );
}

export default App;

```

# useCallback Hook in React

## Overview
The `useCallback` hook is a built-in React hook that returns a memoized version of a callback function. It helps optimize performance by preventing unnecessary re-creations of functions on every render, particularly useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.

## Syntax
```javascript
const memoizedCallback = useCallback(() => {
    // Callback function
}, [dependencies]);
----------------------------------------------------
import React, { useState, useCallback } from 'react';

const ChildComponent = React.memo(({ onButtonClick }) => {
    console.log('Child component rendered');
    return <button onClick={onButtonClick}>Click Me</button>;
});

function ParentComponent() {
    const [count, setCount] = useState(0);

    // Memoizing the callback to prevent re-renders of the child
    const handleClick = useCallback(() => {
        console.log('Button clicked');
    }, []); // Only recreated when dependencies change

    return (
        <div>
            <p>Count: {count}</p>
            <ChildComponent onButtonClick={handleClick} />
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
        </div>
    );
}

```

# useMemo Hook in React

## Overview
The `useMemo` hook is a built-in React hook that allows you to memoize the result of a computation. It is used to optimize performance by preventing expensive calculations from running on every render, recalculating only when specific dependencies change.

## Syntax
```javascript
const memoizedValue = useMemo(() => {
    // Computation
    return computedValue;
}, [dependencies]);

import React, { useState, useMemo } from 'react';

function App() {
    const [count, setCount] = useState(0);

    // Memoizing an expensive computation
    const expensiveComputation = useMemo(() => {
        console.log('Computing...');
        return count * 2; // Simulating an expensive calculation
    }, [count]); // Recalculates only when count changes

    return (
        <div>
            <p>Count: {count}</p>
            <p>Computed Value: {expensiveComputation}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
```

# useRef Hook in React

## Overview
The `useRef` hook is a built-in React hook that allows you to create a mutable object which holds a `.current` property. It is primarily used for accessing and interacting with DOM elements, storing mutable values, and preserving values across renders without triggering re-renders.

## Syntax
```javascript
const refContainer = useRef(initialValue);

import React, { useRef } from 'react';

function FocusInput() {
    const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current.focus(); // Accessing the DOM node to focus
    };

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="Type here..." />
            <button onClick={handleFocus}>Focus the input</button>
        </div>
    );
}
```
========================================================================================================
                                            ADAVANCE TOPIC
========================================================================================================
# Accessibility in React

## Overview
Accessibility (often abbreviated as a11y) is the practice of making web applications usable for people of all abilities and disabilities. Ensuring your React applications are accessible improves user experience and complies with legal standards.

## Why Accessibility Matters
- **Inclusive Design**: Making your application usable by people with disabilities, including those who use screen readers, keyboard navigation, or other assistive technologies.
- **Legal Compliance**: Adhering to guidelines such as the Web Content Accessibility Guidelines (WCAG) and regulations like the Americans with Disabilities Act (ADA).
- **Improved SEO**: Accessible websites often have better search engine rankings.

## Key Principles of Accessibility

### 1. Semantic HTML
Use proper HTML elements to convey meaning. For example:
- Use `<button>` for buttons, `<header>` for headings, and `<nav>` for navigation links.
- This ensures assistive technologies can interpret the structure and functionality of your application correctly.

### 2. ARIA Roles and Attributes
When native HTML elements cannot provide the necessary semantics, use ARIA (Accessible Rich Internet Applications) attributes.
- Example:
  ```html
  <div role="button" tabIndex="0" onClick={handleClick}>
      Click me
  </div>
``
----------------------------------------------------------------------------

# Code Splitting in React

## Overview
Code splitting is a technique that allows you to split your application into smaller bundles, which can be loaded on demand. This improves the performance of your application by reducing the initial load time and allowing users to download only the code they need.

## Benefits of Code Splitting
- **Reduced Initial Load Time**: Users can load only the necessary code for the page they are accessing.
- **Improved Performance**: Smaller bundles lead to faster load times and better user experience.
- **On-Demand Loading**: Load components only when needed, such as during route changes.

---------------------------------------------------------------------------------------

# Error Boundaries in React

## Overview
Error Boundaries are a React feature that allows developers to catch JavaScript errors in their component tree, log those errors, and display a fallback UI instead of crashing the entire component tree. They help in improving the user experience by gracefully handling errors.

## Key Features
- **Catches JavaScript Errors**: Errors that occur during rendering, in lifecycle methods, and in constructors of the whole tree below them.
- **Does Not Catch**: Errors in event handlers, asynchronous code (like `setTimeout`), or server-side rendering.

## Creating an Error Boundary
To create an Error Boundary, you need to define a class component that implements the `componentDidCatch` lifecycle method and the `getDerivedStateFromError` static method.

---------------------------------------------------------------------------------------

## Frangments
A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.

```js
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

------------------------------------------------------------------------------------------
# Higher-Order Components (HOCs) in React

## Overview
A Higher-Order Component (HOC) is an advanced pattern in React used to reuse component logic. It is a function that takes a component and returns a new component, allowing you to enhance or modify the behavior of the original component without changing its structure.

## Definition
An HOC is essentially a function that accepts a component as an argument and returns a new component:

# Use Cases for HOCs
**Code Reusability**: Encapsulate common functionality that can be shared across multiple components.
**Conditional Rendering**: Render different components based on certain conditions.
**State Management**: Manage shared state or side effects in a single place.

```js
import React from 'react';

const withLogging = (WrappedComponent) => {
    return class extends React.Component {
        componentDidMount() {
            console.log("Props:", this.props);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};

// Usage
const MyComponent = (props) => <div>{props.message}</div>;

const EnhancedComponent = withLogging(MyComponent);
```

------------------------------------------------------------------------------------------

# React Features

React is a popular JavaScript library for building user interfaces. Here are some of its key features:

## 1. Component-Based Architecture
- **Reusable Components**: Build encapsulated components that manage their own state.
- **Composition**: Components can be combined to create complex UIs.

## 2. Virtual DOM
- **Efficient Rendering**: React maintains a lightweight virtual representation of the DOM, enabling efficient updates.
- **Batch Updates**: React batches multiple updates for performance optimization.

## 3. Unidirectional Data Flow
- **Data Flow**: Data flows in a single direction, making it easier to understand and debug.
- **Props and State**: Components receive data via props and manage their own state.

## 4. JSX Syntax
- **JavaScript and HTML**: JSX allows you to write HTML elements in JavaScript, making code more readable.
- **Expression Embedding**: You can embed JavaScript expressions directly in JSX.

## 5. Lifecycle Methods
- **Component Lifecycle**: React provides lifecycle methods (e.g., `componentDidMount`, `componentWillUnmount`) to manage component behavior.
- **Hooks**: Use hooks (like `useEffect`) for handling side effects in functional components.

## 6. Hooks API
- **State Management**: Use `useState` for managing component state in functional components.
- **Side Effects**: Use `useEffect` to handle side effects, like data fetching or subscriptions.

## 7. Context API
- **Global State Management**: Share state across components without prop drilling using Context.
- **Provider and Consumer**: Create a Provider to supply data and Consumers to access it.

## 8. Performance Optimization
- **Memoization**: Use `React.memo` and `useMemo` to prevent unnecessary re-renders.
- **Code Splitting**: Implement lazy loading with `React.lazy` for better performance.

## 9. Strong Community and Ecosystem
- **Rich Ecosystem**: Numerous libraries and tools (like React Router, Redux) enhance functionality.
- **Community Support**: Active community with extensive documentation and resources.

## 10. Server-Side Rendering (SSR)
- **Next.js**: Framework that enables SSR with React for better SEO and faster initial load times.
- **Static Site Generation (SSG)**: Pre-render pages at build time for improved performance.

----------------------------------------------------------------------------------------------
## # Optimization in React

Optimizing React applications is crucial for improving performance and providing a smooth user experience. Here are some key strategies and techniques for optimizing React applications.

1. Use React.memo
- **Purpose**: Prevent unnecessary re-renders of functional components.
- **Usage**: Wrap your component with `React.memo()`.
  
  ```javascript
  const MyComponent = React.memo((props) => {
      // Component code
  });
    ```

2. Use PureComponent
Purpose: Similar to React.memo, but for class components.

Usage: Extend React.PureComponent instead of React.Component.
```js
class MyComponent extends React.PureComponent {
    // Component code
}
```

3. Optimize State Management
Local State: Keep state local to the component as much as possible.

Avoid Unnecessary State Updates: Use functional updates when the new state depends on the old state.

```js
setState(prevState => ({ count: prevState.count + 1 }));
```

4. Use useMemo and useCallback
useMemo: Memoize expensive calculations to avoid recalculating on every render.
useCallback: Memoize callback functions to prevent re-creating them on every render.

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

const memoizedCallback = useCallback(() => {
    // Callback code
}, [dependencies]);
```

5. Code Splitting
Dynamic Imports: Use React.lazy and Suspense for lazy loading components.

```js
const LazyComponent = React.lazy(() => import('./LazyComponent'));

<Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
</Suspense>
```

6. Throttle and Debounce Events
Throttling: Limit the number of times a function can be called over time.
Debouncing: Delay the execution of a function until after a specified time period.

```js
const throttledFunction = throttle(handleEvent, 1000);

const debouncedFunction = debounce(handleEvent, 300);
```

8. Avoid Inline Functions in Render
Issue: Inline functions can cause unnecessary re-renders.
Solution: Move function definitions outside of the render method or use useCallback.
9. Use the React DevTools Profiler
Profiling: Analyze performance and identify components that are re-rendering frequently.
Optimization: Use insights from the Profiler to make informed optimizations.

10. Bundle Size Optimization
Tree Shaking: Eliminate unused code from bundles.
Minification: Use tools like Webpack or Terser to minify your code.
Analyze Bundle Size: Use tools like source-map-explorer to analyze and reduce bundle size.

-----------------------------------------------------------------------------------------------------
# DOM APIs

The Document Object Model (DOM) provides a structured representation of the document and defines methods to access and manipulate it. Here’s a summary of some key DOM APIs:

## 1. Document API
- **`document`**: The root object representing the entire HTML or XML document.
- **Methods**:
  - **`document.getElementById(id)`**: Returns the element with the specified ID.
  - **`document.querySelector(selector)`**: Returns the first element that matches a specified CSS selector.
  - **`document.querySelectorAll(selector)`**: Returns a NodeList of all elements matching the specified selector.
  - **`document.createElement(tagName)`**: Creates a new element node with the specified tag name.

## 2. Element API
- **Element Methods**:
  - **`element.appendChild(child)`**: Adds a child node to an element.
  - **`element.removeChild(child)`**: Removes a specified child node from an element.
  - **`element.replaceChild(newChild, oldChild)`**: Replaces one child node with another.
  - **`element.cloneNode(deep)`**: Creates a copy of the element; if `deep` is true, it clones all child nodes as well.

- **Element Properties**:
  - **`element.innerHTML`**: Gets or sets the HTML content of an element.
  - **`element.textContent`**: Gets or sets the text content of an element, ignoring HTML tags.
  - **`element.classList`**: Provides methods to manipulate the class attribute (e.g., `add`, `remove`, `toggle`).

## 3. Event API
- **Event Handling**:
  - **`element.addEventListener(type, listener)`**: Attaches an event handler to the specified element.
  - **`element.removeEventListener(type, listener)`**: Removes an event handler from the specified element.
  
- **Event Object**:
  - Contains information about the event (e.g., `event.type`, `event.target`).

## 4. Node API
- **Node Properties**:
  - **`node.nodeType`**: Returns the type of the node (e.g., element, text).
  - **`node.parentNode`**: References the parent node of the current node.
  - **`node.childNodes`**: Returns a NodeList of child nodes.

- **Node Methods**:
  - **`node.contains(otherNode)`**: Checks if the node is an ancestor of the specified node.

## 5. CSSOM (CSS Object Model)
- **`window.getComputedStyle(element)`**: Retrieves the computed styles of an element.
- **Element Styles**:
  - **`element.style`**: Accesses the inline styles of an element.

## 6. Storage API
- **Local Storage**:
  - **`localStorage.setItem(key, value)`**: Stores a value associated with a key.
  - **`localStorage.getItem(key)`**: Retrieves a value associated with a key.
  
- **Session Storage**:
  - Similar to localStorage but data persists only for the session.

## 7. Fetch API
- **Network Requests**: 
  - **`fetch(url)`**: Initiates a network request to the specified URL and returns a Promise.
  
  ```javascript
  fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => console.log(data));
    ```


------------------------------------------------------------------------------------------------------
# Cross-Browser Functionality in JavaScript and React

Ensuring that your web applications function consistently across different browsers is essential for a good user experience. This document outlines various strategies and best practices for handling cross-browser compatibility in JavaScript and React.

## 1. Feature Detection
- Instead of checking for browser versions, check for the specific features you need.
- **Example:**
    ```javascript
    if ('fetch' in window) {
      // Fetch API is supported
    } else {
      // Provide a polyfill or alternative method
    }
    ```

## 2. Polyfills
- Use polyfills for features not supported in older browsers.
- **Example:** Include polyfills for modern JavaScript features using Babel.
    ```javascript
    import 'core-js/stable';
    import 'regenerator-runtime/runtime';
    ```

## 3. CSS Resets and Normalization
- Different browsers have different default styles. Use a CSS reset or normalization library.
- **Recommended Library:** [Normalize.css](https://necolas.github.io/normalize.css/)

## 4. Use Libraries and Frameworks
- Leverage libraries like React, which handle many cross-browser inconsistencies for you.
- Consider using utility libraries like Lodash or Axios for additional compatibility.

## 5. Testing Across Browsers
- Regularly test your application in various browsers (Chrome, Firefox, Safari, Edge).
- Use tools like [BrowserStack](https://www.browserstack.com/) or [Sauce Labs](https://saucelabs.com/) for cross-browser testing.

## 6. Conditional Comments (for Older IE)
- Use conditional comments to target Internet Explorer.
    ```html
    <!--[if lt IE 9]>
    <script src="https://example.com/polyfill.js"></script>
    <![endif]-->
    ```

## 7. Avoid Browser-Specific Features
- Refrain from using features that are only available in specific browsers.
- Provide fallbacks or alternative solutions if necessary.

## 8. Linting and Code Quality Tools
- Use ESLint with plugins like `eslint-plugin-react` to enforce best practices that enhance compatibility.

## 9. Build Tools
- Utilize build tools like Webpack or Parcel to bundle your JavaScript.
- Configure Babel for transpilation to support older browsers.

### Example Setup for React

1. **Install Required Packages**
    ```bash
    npm install react react-dom babel-polyfill @babel/preset-env @babel/preset-react
    ```

2. **Babel Configuration (babel.config.js)**
    ```javascript
    module.exports = {
      presets: [
        '@babel/preset-env', 
        '@babel/preset-react'
      ],
    };
    ```

3. **Using the Polyfill in Your Entry Point**
    ```javascript
    import 'babel-polyfill';
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    ReactDOM.render(<App />, document.getElementById('root'));
    ```

## Conclusion
By combining feature detection, polyfills, CSS normalization, and thorough testing, you can significantly improve the cross-browser functionality of your JavaScript and React applications. Stay updated on web standards to ensure ongoing compatibility.

--------------------------------------------------------------------------------------------------------
# Bundling and Building Files in React, Node.js, and Other Applications

Bundling and building files is crucial in modern web development, optimizing code for performance and deployment. This document outlines the process for React and Node.js applications, as well as general practices for other types of applications.

## 1. What is Bundling?
Bundling combines multiple files (JavaScript, CSS, images, etc.) into fewer files, reducing the number of HTTP requests and improving load times.

## 2. Common Build Tools
Various tools are commonly used for bundling and building:

- **Webpack**: A powerful module bundler for JavaScript applications.
- **Parcel**: A zero-configuration web application bundler.
- **Rollup**: Primarily used for libraries and smaller projects.
- **Vite**: A fast build tool that enhances the development experience.

## 3. Bundling in React Applications
React applications often use `create-react-app`, which utilizes Webpack for bundling.

## Output Structure:
index.html: The main HTML file.
static/js: Contains JavaScript bundles.
static/css: Contains CSS files.

--------------------------------------------------------------------------------------------------------
# Webpack Notes

Webpack is a powerful module bundler for JavaScript applications. It takes modules with dependencies and generates static assets representing those modules. This document provides an overview of Webpack, its configuration, and common usage.

## What is Webpack?
Webpack is a module bundler that allows developers to bundle JavaScript files for usage in a browser. It also supports transforming, packaging, and optimizing resources like CSS, images, and HTML.

## Key Concepts

- **Entry**: The entry point indicates where Webpack starts the bundling process. It can be a single file or an array of files.
  
- **Output**: The output property specifies where to emit the bundles and how to name them.
  
- **Loaders**: Loaders enable Webpack to process files other than JavaScript, such as CSS or images.
  
- **Plugins**: Plugins extend Webpack's capabilities, allowing for tasks such as optimizing bundles or managing assets.

- **Modules**: Webpack treats every file (JavaScript, CSS, images, etc.) as a module.

## Installation

To install Webpack and Webpack CLI, use npm:

```bash
npm install --save-dev webpack webpack-cli
```

------------------------------------------------------------------------------------------------------
## Web security is crucial for protecting applications and user data from various threats. As a frontend developer, you can implement several practices to enhance security. Here are some key concepts and protective measures:

Key Security Concepts
# Cross-Site Scripting (XSS):

Malicious scripts are injected into web pages viewed by users.
Types: Stored, Reflected, and DOM-based XSS.
Cross-Site Request Forgery (CSRF):

An attacker tricks the user into submitting a malicious request.
This exploits the user's authenticated session.

# Content Security Policy (CSP):
A security feature that helps prevent XSS by specifying which sources of content are trusted.
Secure Sockets Layer (SSL)/Transport Layer Security (TLS):

Protocols for encrypting data between the client and server.
# Same-Origin Policy:
A security measure that restricts how documents or scripts loaded from one origin can interact with resources from another origin.

# Authentication and Authorization:
Ensuring that users are who they say they are (authentication) and have permission to access specific resources (authorization).

## ------------------Protective Measures
# Input Validation and Sanitization:

Always validate and sanitize user inputs to prevent XSS and other injection attacks.
Use libraries like DOMPurify for sanitizing HTML.
# Use HTTPS:

Always serve your site over HTTPS to encrypt data in transit. Obtain an SSL certificate.
# Implement CSP:

Define a Content Security Policy to control sources of content and reduce the risk of XSS attacks.
# CSRF Tokens:
Use anti-CSRF tokens in forms and AJAX requests to validate the authenticity of requests.

# Secure Cookies:
Set cookies with the HttpOnly and Secure flags to prevent access via JavaScript and ensure they are sent over HTTPS.

# Regular Updates:
Keep your libraries and frameworks updated to patch known vulnerabilities.

# Error Handling:

Avoid exposing stack traces and sensitive information in error messages. Use generic error messages instead.
# Client-Side Security Libraries:

Utilize libraries and tools for secure coding practices, such as Helmet.js for securing HTTP headers in Node.js applications.

# User Education:

Educate users about phishing attacks and safe browsing practices.
Code Reviews and Security Audits:

Conduct regular code reviews and security audits to identify vulnerabilities in your code.

# Conclusion
By integrating these practices into your development workflow, you can significantly enhance the security of your web applications. It's important to stay informed about the latest security trends and vulnerabilities to continually protect against emerging threats.


======================================================================================================
                                CSS
=========================================================================================================
# CSS
1. 
```css
background-color: Sets just the background color.
background: A shorthand property that can set multiple background-related properties, including color, image, and positioning.
```

# Flexbox vs. CSS Grid

## Overview

### Flexbox
- **Purpose**: One-dimensional layout (either row or column).
- **Use Cases**: Aligning items along a single axis, distributing space within a container.

### CSS Grid
- **Purpose**: Two-dimensional layout (rows and columns).
- **Use Cases**: Creating complex layouts with both horizontal and vertical alignments.

## Key Features

### Flexbox
- Align items easily in one direction.
- Handles dynamic item sizes and spacing.
- Great for responsive designs.

### CSS Grid
- Allows for explicit placement of items in a grid structure.
- Supports overlapping items and more complex layouts.
- Offers features like grid areas for naming and positioning.

## Sample Code

### Flexbox Example

```html
<div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
</div>
```
```css
display: flex;
justify-content: space-around; /* Aligns items horizontally */
align-items: center;  

display: grid;
grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
grid-gap: 10px;
```
-------------------------------------------------------------------------------------------------
2.
# Media Queries

Media queries are a fundamental feature of CSS that enable responsive web design by applying different styles based on the characteristics of the device or viewport. They allow you to adapt your layout and styling to various screen sizes, resolutions, and orientations.

## Key Concepts

### 1. Syntax
Media queries are defined using the `@media` rule, followed by a media type and one or more conditions. 

```css
@media (max-width: 600px) {
    body {
        background-color: lightblue;
    }
}

@media screen and (min-width: 600px) and (orientation: landscape) {
    /* Styles for landscape screens wider than 600px */
}

```
-------------------------------------------------------------------------------------
3. Box Model
    Box model have propertys are like
        Margin, Padding, Border, content, height and width

-------------------------------------------------------------------------------------------
4. Selectors 
    Se

-----------------------------------------------------------------------------------------
5. What is the difference between visibility:hidden and display:none?
Ans. Although these two properties seem similar, there is quite an important difference between the two:
• visibility:hidden hides the element, but it will still take up space, this way affecting the layout of the document.
• display:none also hides the element, but will not take up space and the page will appear as if the element is not present.

--------------------------------------------------------------------------------------------
6. What are CSS preprocessors and why do we use them?
Ans. CSS preprocessors convert code written in a preprocessed language like SASS or LESS into the same old CSS we’ve been using for such a long time now. The main advantages of using preprocessors are:
a. Ability to define variables
b. Ability to use nested syntax
c. Ability to create and use mixins (functions)
d. Use of mathematical and operational functions
However, there are also some disadvantages like updating issues and debugging difficulties.

----------------------------------------------------------------------------------------------
7. What are child selectors in CSS?
Ans. Child selectors represent a way of grouping (for styling) a set of elements that descend from a parent element. For example:
```css
section > span {
background-color: #eee;
}
```

-------------------------------------------------------------------------------------------------
8. What is the purpose of the z-index and how to use it?
Ans. The z-index property specifies the stack order of an element within the document area (or a part of it). An element with greater stack order will always be in front of an element with a lower stack order. However, z-index only works on positioned elements (position:absolute, position:relative, or position:fixed). It can have four kinds of values:

Auto: Sets the stack order equal to its parents.
Number: Orders the stack order.
Initial: Sets this property to its default value (0).
Inherit: Inherits this property from its parent element.

-------------------------------------------------------------------------------------------------
9. Explain what pseudo-classes are and their usage.
Ans. We use Pseudo-classes to define a special state of an element. So, note that pseudo-classes find no definition in the markup. We can use them for:
1. Styling an element on mouseover (hover)
2. Styling an element when it gets focus
3. Styling visited/unvisited links

----------------------------------------------------------------------------------------------------
# CSS Position Property

The `position` property in CSS is used to control the positioning of an element within its containing element. It determines how an element is placed in the document flow and how it interacts with other elements.

## Positioning Values

### 1. `static`
- **Default value.**
- Elements are positioned according to the normal document flow.
- Top, right, bottom, and left properties have no effect.

```css
.element {
    position: static;
}
```

### 2. relative
Element is positioned relative to its normal position.
Moving it with top, right, bottom, or left properties will not affect the position of surrounding elements.
```css
.element {
    position: relative;
    top: 10px; /* Moves the element 10px down from its original position */
}
```

### 3. absolute
Element is positioned relative to its nearest positioned ancestor (not static).
Removed from the normal document flow, which means it doesn’t affect the layout of other elements.
```css
.element {
    position: absolute;
    top: 20px; /* 20px from the top of the nearest positioned ancestor */
    left: 15px; /* 15px from the left of the nearest positioned ancestor */
}
```

### 4. fixed
Element is positioned relative to the viewport, meaning it stays in the same place even when the page is scrolled.
Also removed from the normal document flow.

```css
.element {
    position: fixed;
    bottom: 0; /* Sticks to the bottom of the viewport */
    right: 0; /* Sticks to the right of the viewport */
}
```
### 5. sticky
Element is treated as relative until it crosses a specified threshold, at which point it is treated as fixed.
Useful for elements that should stick to the top of a container when scrolling.
```css
.element {
    position: sticky;
    top: 0; /* Sticks to the top of its container when scrolling */
}
```































proactive
accountability
initiative
proactiob
responsibility



education
training on any skills
then work exeperiance
skills focus react js with redux core little bit worked on backend
as per project demand on both frontend and backend



