## TOPICS
* [13 Conditional rendering
](#13 Conditional rendering)
----------------------------------------------------------------------------------------------------------------------------
## 13 Conditional rendering

Conditional rendering in Vue.js allows you to show or hide elements in the DOM based on some condition or state. This is often used for controlling UI elements, components, or parts of the UI that should appear under specific conditions. Vue provides several ways to handle conditional rendering.

## 13.1. `v-if` Directive

The `v-if` directive is used to conditionally render elements in the DOM. If the condition evaluates to `true`, the element is rendered, otherwise, it's not.

### Syntax:

```vue
<template>
  <div>
    <p v-if="isVisible">This is visible when isVisible is true</p>
    <button @click="toggleVisibility">Toggle Visibility</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>
```

Key Points:

    The element is removed from the DOM when v-if condition is false.
    v-if is more expensive than v-show because it involves adding/removing elements from the DOM.

# 13.2. v-else and v-else-if
The v-else directive is used in conjunction with v-if to handle the "else" case when the v-if condition is false. You can also use v-else-if for multiple conditional branches.

```vue
<template>
  <div>
    <p v-if="status === 'success'">Success!</p>
    <p v-else-if="status === 'error'">Error!</p>
    <p v-else>Loading...</p>
    <button @click="changeStatus">Change Status</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 'loading',
    };
  },
  methods: {
    changeStatus() {
      const statuses = ['success', 'error', 'loading'];
      const nextStatus = statuses[(statuses.indexOf(this.status) + 1) % statuses.length];
      this.status = nextStatus;
    },
  },
};
</script>

```
Key Points:

    v-else must immediately follow a v-if or v-else-if block.
    The condition of v-else is implicitly the inverse of the previous condition.

# 13.3. v-show Directive

The v-show directive is similar to v-if, but instead of removing the element from the DOM, it toggles the display CSS property.

```vue
<template>
  <div>
    <p v-show="isVisible">This is conditionally visible with v-show</p>
    <button @click="toggleVisibility">Toggle Visibility</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

```

# 13.4. v-for with Conditional Rendering

You can combine v-for with v-if to conditionally render items in a list.

```vue
<template>
    <!-- Array itterating  -->
  <div>
    <ul>
      <li v-for="(item, index) in items" v-if="item.active" :key="item.id">
        {{index}} - {{ item.name }}
      </li>
    </ul>
  </div>
  <!-- OBJECT itterating  -->
  <template v-for="(value, key, index) in myInfo" :key="index">
    <h2>{{value}}</h2>
    <template v-if="key === 'skill'">
        <h3 v-for="skill in value"> {{skill}} </h3>
    </template>
  </template>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: 'Item 1', active: true },
        { id: 2, name: 'Item 2', active: false },
        { id: 3, name: 'Item 3', active: true },
      ],
      myInfo: {
        name:"ABC",
        job: "SW",
        skill: ['JS', 'vue']
      }
    };
  },
};
</script>

```

# 13.5. Ternary Operator in Templates

Vue.js supports inline conditional rendering using JavaScript expressions, including the ternary operator (condition ? value1 : value2).

```vue
<template>
  <div>
    <p>{{ isVisible ? 'Visible' : 'Hidden' }}</p>
    <button @click="toggleVisibility">Toggle Visibility</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

```
Key Points:

    The ternary operator allows for more compact conditional logic.
    It can be used directly inside the template’s interpolation syntax.

## 13.6. Using v-if with Template

You can use the v-if directive on a <template> tag to conditionally render multiple elements without adding an extra DOM element.
```vue
<template>
  <div>
    <template v-if="isVisible">
      <p>This will be shown</p>
      <p>This will also be shown</p>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
    };
  },
};
</script>
```
Key Points:

    Using v-if on <template> does not create an extra wrapper element, which is helpful for keeping your DOM structure clean.

# Note
Vue.js provides multiple directives for conditional rendering, each with its own use case and performance implications. Here's a quick rundown of when to use each:

    v-if: Use for conditions that need to add/remove elements from the DOM.
    v-show: Use for conditions where you need to toggle visibility without removing elements from the DOM.
    v-else and v-else-if: Use to handle "else" and "else if" cases in conditional rendering.
    v-for with v-if: Use for rendering lists with conditions, though be mindful of performance.
    Ternary Operators: Use for inline conditions in template expressions.
    v-if with <template>: Use when you need to render multiple elements conditionally without adding extra DOM elements.


# List and key sample
```vue
<template>
    <!-- Here if u not mention the key, then while shuffling input value will not shuffle  -->
  <template v-for="name in names" :key="name">
    <h2>{{ name }}</h2>
    <input placeholder="Last name" />
    <hr />
  </template>
  <button @click="shuffle">Shuffle!</button>
</template>

<script>
import _ from "lodash";
export default {
  name: "App",
  data() {
    return {
      names: ["Bruce", "Clark", "Diana", "Barry"],
    };
  },
  methods: {
    shuffle() {
      console.log(this.names);
      this.names = _.shuffle(this.names);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```
# Key Considerations for Better Performance

    Use Unique Keys: Always ensure that the key is unique, typically using an ID or a unique property of the item.
    Avoid Using Index as key: Do not use the index as the key if the list order is likely to change.
    Reordering Lists: If the order of list items is likely to change (e.g., drag-and-drop), it’s important that each list item has a unique and stable key to prevent Vue from reusing or misplacing elements.

======================================================================================================================================================

## 14 - METHODS

```vue
<template>
    <h2>{{2 + 3 + 5}}</h2>
    <h2>Add Method = {{ add(2, 3, 5) }} </h2>
    <h2>Multiplt Method = {{ multiply(baseValue) }} </h2>
</template>

<script>
    export default {
        name: 'App',
        data(){
            return {
                baseValue:5,
                baseMultiplier: 10
            }
        },
        // DONT USE ARROW FUNTION INSIDE METHOD IT WILL RETURN UNDEFINED ERROR ON CONSOLE 
        methods: {
            add(a, b, c){
                return a + b + c
            },
            multiply(num){
                return this.baseMultiplier * num
            }
        },
    }
</script>
```

# 14.1 Methods vs Computed Properties

    Both methods and computed properties are used for reactive logic in Vue.js, but there are some key differences:

    Methods: Methods are executed every time they are referenced. They are useful for performing actions that don’t need to be cached, such as event handling.

    Computed Properties: Computed properties are cached based on their dependencies. They are only recomputed when the data they depend on changes.

```vue
<template>
  <div>
    <p>{{ reversedName }}</p> <!-- Computed -->
    <button @click="reverseName">Reverse Name</button> <!-- Method -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Vue.js'
    };
  },
  computed: {
    reversedName() {
      return this.name.split('').reverse().join('');
    }
  },
  methods: {
    reverseName() {
      this.name = this.name.split('').reverse().join('');
    }
  }
}
</script>
```

# 14.2 Accessing Methods in Other Parts of the Component

Methods can be accessed not just from the template but also from within other methods or lifecycle hooks. You can use this to call methods within the component.

```vue
<template>
  <div>
    <button @click="handleClick">Click me</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    handleClick() {
      this.increment();
      console.log("Button clicked!");
    }
  }
}
</script>
```

# 14.3 Using this Inside Methods

Within methods, you can access the component's data, computed properties, and other methods via the this keyword.

```vue
<template>
  <div>
    <button @click="showMessage">Show Message</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello, Vue!"
    };
  },
  methods: {
    showMessage() {
      alert(this.message); // Accessing data inside method using 'this'
    }
  }
}
</script>
```

# 14.4 Binding this to Methods

In JavaScript, when you pass methods around, this may not point to the Vue component instance. To solve this issue, you can use .bind(this) or arrow functions.

```vue 
<template>
  <div>
    <button @click="handleClick">Click me</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    handleClick: function() {
      // 'this' refers to the Vue instance
      this.count++;
      console.log(this.count);
    }
  }
}
</script>
```

# 14.5 Method Callbacks and Promises

You can use methods with asynchronous code like setTimeout, setInterval, or Promises. This is useful for handling side effects and performing actions after delays.

```vue
<template>
  <div>
    <button @click="fetchData">Fetch Data</button>
    <p>{{ status }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 'Waiting for data...'
    };
  },
  methods: {
    async fetchData() {
      this.status = 'Loading...';
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        this.status = `Received ${data.length} posts`;
      } catch (error) {
        this.status = 'Error loading data';
      }
    }
  }
}
</script>
```

==========================================================================================================================================
## 15- EVENTS

# 15.Basic Event Handling

In Vue.js, you can bind an event handler to an element using the v-on directive. A common shorthand for this is the @ symbol.

```vue
<!-- Basic Event Binding -->
<template>
  <button v-on:click="handleClick">Click me</button>
  <!-- Shorthand -->
  <button @click="handleClick">Click me</button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log('Button clicked');
    }
  }
}
</script>
```

# 15.2. Modifiers

Vue provides several event modifiers to make event handling more convenient. They allow you to specify additional behaviors when handling events, such as stopping event propagation, preventing the default action, and more.

Event Modifiers:

    .stop: Calls event.stopPropagation() to prevent the event from bubbling up the DOM.
    .prevent: Calls event.preventDefault() to prevent the default action associated with the event.
    .capture: Adds event listener in capture mode, which is the opposite of the default "bubble" mode.
    .once: Ensures the event handler is triggered only once.
    .passive: Marks the event handler as passive, which can improve performance for scrolling and touch events.

```vue
<template>
  <!-- Prevents default action (e.g., submitting a form) -->
  <form @submit.prevent="handleSubmit">Submit</form>

  <!-- Stops event propagation (e.g., clicks won't propagate to parent elements) -->
  <button @click.stop="handleClick">Click me</button>

  <!-- Handles event in capture phase -->
  <div @click.capture="handleClickInCapture">Click here</div>
</template>
```

# 15.3 Event Modifiers
.stop
  Stops the event from propagating to parent elements.

.prevent
  Prevents the default behavior associated with the event.

.capture
  Enables event capture, which is the opposite of the normal event bubbling.

.once
  Executes the event handler only once, then removes it.

.passive
  Improves performance by telling the browser that the event handler will not call preventDefault.


```vue
<button @click.stop="handleClick">Click me</button>
<form @submit.prevent="handleSubmit">Submit</form>
<div @click.capture="handleClickInCapture">Click me in capture phase</div>
<button @click.once="handleClickOnce">Click me only once</button>
<div @scroll.passive="handleScroll">Scroll me</div>
```

# 15.4 Custom Events
In Vue, components can emit custom events to communicate with their parent components. You can emit events from a child component and listen for those events in the parent component.

```vue
<!-- Emitting Events in Child Component: -->
<!-- ChildComponent.vue -->
<template>
  <button @click="sendEvent">Send Event</button>
</template>

<script>
export default {
  methods: {
    sendEvent() {
      this.$emit('custom-event', 'Hello from Child');
    }
  }
}
</script>


<!-- Listening for Events in Parent Component: -->
 <!-- ParentComponent.vue -->
<template>
  <ChildComponent @custom-event="handleCustomEvent" />
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  methods: {
    handleCustomEvent(payload) {
      console.log(payload); // "Hello from Child"
    }
  }
}
</script>
```

# 15.5. Event Handling in Components

Vue components can listen for native DOM events or custom events from child components. Additionally, components can bind multiple events or conditionally handle events using methods.
Binding Multiple Event Handlers:

You can bind multiple event handlers by using an object syntax with v-on.

```vue
<template>
  <button v-on="{ click: handleClick, mouseover: handleMouseOver }">
    Hover or Click me
  </button>
</template>

<!-- Conditionally Handling Events: -->
 <template>
  <button @click="isEnabled ? handleClick() : null">Click me</button>
</template>
```

# 15.6. Key Modifiers

Vue provides special key modifiers that make it easy to listen for specific keys in event handlers.
Common Key Modifiers:

    .enter: Fires when the Enter key is pressed.
    .tab: Fires when the Tab key is pressed.
    .esc: Fires when the Escape key is pressed.
    .space: Fires when the Spacebar key is pressed.

```html
<template>
  <!-- Handle enter key -->
  <input @keyup.enter="handleEnter">

  <!-- Handle escape key -->
  <input @keyup.esc="handleEscape">
</template>

<script>
export default {
  methods: {
    handleEnter() {
      console.log('Enter key pressed');
    },
    handleEscape() {
      console.log('Escape key pressed');
    }
  }
}
</script>

<!-- You can also combine multiple key modifiers: -->
 <!-- Listen for Enter or Escape key -->
<input @keyup.enter.esc="handleKeyPress">

```


NOTE:
Vue's event handling system provides a clean, declarative, and flexible way to respond to user interactions and DOM events. You can use the v-on directive or its shorthand @ to bind event listeners, apply event modifiers for common behaviors, and emit custom events to communicate between components. This flexibility makes Vue a powerful tool for handling events in modern web applications.


==================================================================================================================================================

## 16 Form handling

# 16.1 Basic Example: Simple Form Binding

In Vue.js, you can handle form inputs using two-way data binding with the v-model directive. Here's a simple example of handling a form in Vue:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue Form Handling</title>
</head>
<body>
  <div id="app">
    <h2>Vue Form Handling Example</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required>
      </div>
      <button type="submit">Submit</button>
    </form>

    <div v-if="submitted">
      <h3>Form Submitted</h3>
      <p>Name: {{ form.name }}</p>
      <p>Email: {{ form.email }}</p>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: {
        form: {
          name: '',
          email: ''
        },
        submitted: false
      },
      methods: {
        handleSubmit() {
          this.submitted = true;
          // You can also send data to an API here
          console.log('Form Data:', this.form);
        }
      }
    });
  </script>
</body>
</html>
```
v-model: This directive creates a two-way data binding between the form inputs and the component’s data. In this case, the input fields for name and email are bound to the form.name and form.email data properties.

@submit.prevent: This listens for the form submission event. The .prevent modifier prevents the default form submission behavior (which would cause a page reload).

handleSubmit: This method is triggered when the form is submitted. In this example, it sets submitted to true and logs the form data to the console. You could also add logic to submit the form data to a server or API here.

# 16.2 Handling Multiple Inputs

You can handle more complex forms with multiple fields by extending the data object. Here's an example with additional fields like "age" and "message".

```html
<div id="app">
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="form.name" required>
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="form.email" required>
    </div>
    <div>
      <label for="age">Age:</label>
      <input type="number" id="age" v-model="form.age" required>
    </div>
    <div>
      <label for="message">Message:</label>
      <textarea id="message" v-model="form.message" required></textarea>
    </div>
    <button type="submit">Submit</button>
  </form>

  <div v-if="submitted">
    <h3>Form Submitted</h3>
    <p>Name: {{ form.name }}</p>
    <p>Email: {{ form.email }}</p>
    <p>Age: {{ form.age }}</p>
    <p>Message: {{ form.message }}</p>
  </div>
</div>
```
```js
data: {
  form: {
    name: '',
    email: '',
    age: '',
    message: ''
  },
  submitted: false
}
```

# 16.3 Validations

To ensure data integrity, you can add basic validation in your Vue method or use external libraries like VeeValidate or Vuelidate for more advanced form validation.
Basic Validation Example:
```js
methods: {
  handleSubmit() {
    if (!this.form.name || !this.form.email || !this.form.age || !this.form.message) {
      alert("Please fill all fields");
      return;
    }
    this.submitted = true;
    console.log('Form Data:', this.form);
  }
}
```

# 16.4 Working with Checkboxes and Radio Buttons

You can also bind to checkboxes and radio buttons in Vue using v-model.

```html
<div>
  <label>
    <input type="checkbox" v-model="form.acceptTerms"> I accept the terms and conditions
  </label>
</div>
```

In this case, form.acceptTerms will be a boolean (true or false).

```html
<div>
  <label>
    <input type="radio" v-model="form.gender" value="male"> Male
  </label>
  <label>
    <input type="radio" v-model="form.gender" value="female"> Female
  </label>
</div>
```

# 16.5 Submitting Form Data

For submitting form data to a server, you can use axios, fetch, or other HTTP libraries. Here’s how you might do it with axios:

```js
methods: {
  async handleSubmit() {
    try {
      const response = await axios.post('/submit-form', this.form);
      this.submitted = true;
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
}
```

====================================================================================================================================================

## 17-MODIFIER

In Vue.js, modifiers are special postfixes added to directives to modify their behavior. They allow you to tweak the behavior of an event or a directive without having to write additional logic in your methods.

Here’s a detailed overview of the common modifiers in Vue.js, including .md (though I assume you might be referring to event and directive modifiers rather than .md as a file extension).

# 17.1 Event Modifiers
Event modifiers are added to event listeners to modify their behavior. They help to handle specific event-related tasks like stopping the event propagation, preventing the default action, or listening for certain types of events.

# 17.1.1 .prevent

This modifier calls event.preventDefault() to prevent the default behavior of an event.

```html
<!-- Prevents the default action of the form submission -->
<form @submit.prevent="submitForm">
  <button type="submit">Submit</button>
</form>
```

# 17.1.2 .stop

This modifier calls event.stopPropagation() to stop the event from propagating up to parent elements.

```html
<!-- Prevents event bubbling (no parent will be notified) -->
<button @click.stop="doSomething">Click Me</button>
```

# 17.1.3 .capture

This modifier listens for events during the capture phase, before they reach the target element.

```html
<!-- Event is captured before bubbling starts -->
<div @click.capture="onCapture">Click Me</div>
```

# 17.1.4 .self

This modifier ensures the event is only triggered if the event target is the element itself (not its children).

```html
<!-- Click on the button itself, but not on the children of the button -->
<button @click.self="onClick">Click Me</button>
```

# 17.1.5 .once

This modifier ensures the event is triggered only once.

# 17.1.6 .passive

This modifier is used to indicate that the event listener will not call event.preventDefault(), which is useful for optimizing touch and wheel events.

# 17.1.7 .dblclick

You can use this modifier to listen for the double-click event.

```html
<!-- Event will trigger only the first time -->
<button @click.once="onClick">Click Me Once</button>

<!-- The event listener is passive (does not prevent default) -->
<div @scroll.passive="onScroll">Scroll Me</div>

<button @click.dblclick="onDblClick">Double Click Me</button>

```


# 17.2. Input Modifiers

These modifiers are used to modify the behavior of form elements like <input>, <textarea>, and <select> when binding with v-model.

# 17.2.1 .lazy

By default, v-model updates the bound data on input events. The .lazy modifier updates the data only after the change event, not the input event.

# 17.2.2 .number

This modifier attempts to automatically convert the input value to a number.

# 17.2.3 .trim

This modifier automatically trims any whitespace from the input value.

```html
<!-- Update value after losing focus or after pressing enter -->
<input v-model.lazy="message">

<!-- Automatically converts input to number -->
<input v-model.number="age" type="number">


<!-- Automatically trims spaces -->
<input v-model.trim="message" placeholder="No spaces around">
```

# 17.3. Modifiers for v-bind

The v-bind directive doesn't have its own set of specific modifiers, but you can still use standard Vue.js syntax like .sync for two-way binding between parent and child components.

# 17.3.1 .sync

This modifier is used to enable two-way binding for prop updates between parent and child components.

```html
<!-- Parent Component -->
<child-component :value.sync="parentValue"></child-component>

<!-- Child Component -->
<template>
  <button @click="$emit('update:value', newValue)">Update</button>
</template>
```

# 17.4. Modifiers for v-model (Vue 3 specific)

Vue 3 added a few enhancements to the v-model directive, including the use of custom modifiers when working with multiple v-model bindings in the same component.

# 17.4.1 .modelValue

In Vue 3, you can use the .modelValue prop to handle multiple model bindings:
```html
<!-- In Parent Component -->
<custom-input v-model:modelValue="value"></custom-input>

<!-- In Child Component -->
<template>
  <input v-model="localValue" />
</template>
<script>
export default {
  props: ['modelValue'],
  data() {
    return {
      localValue: this.modelValue
    };
  },
  watch: {
    localValue(newVal) {
      this.$emit('update:modelValue', newVal);
    }
  }
}
</script>
```

In Vue.js, modifiers are special postfixes added to directives to modify their behavior. They allow you to tweak the behavior of an event or a directive without having to write additional logic in your methods.

Here’s a detailed overview of the common modifiers in Vue.js, including .md (though I assume you might be referring to event and directive modifiers rather than .md as a file extension).
1. Event Modifiers

Event modifiers are added to event listeners to modify their behavior. They help to handle specific event-related tasks like stopping the event propagation, preventing the default action, or listening for certain types of events.
1.1 .prevent

This modifier calls event.preventDefault() to prevent the default behavior of an event.

<!-- Prevents the default action of the form submission -->
<form @submit.prevent="submitForm">
  <button type="submit">Submit</button>
</form>

1.2 .stop

This modifier calls event.stopPropagation() to stop the event from propagating up to parent elements.

<!-- Prevents event bubbling (no parent will be notified) -->
<button @click.stop="doSomething">Click Me</button>

1.3 .capture

This modifier listens for events during the capture phase, before they reach the target element.

<!-- Event is captured before bubbling starts -->
<div @click.capture="onCapture">Click Me</div>

1.4 .self

This modifier ensures the event is only triggered if the event target is the element itself (not its children).

<!-- Click on the button itself, but not on the children of the button -->
<button @click.self="onClick">Click Me</button>

1.5 .once

This modifier ensures the event is triggered only once.

<!-- Event will trigger only the first time -->
<button @click.once="onClick">Click Me Once</button>

1.6 .passive

This modifier is used to indicate that the event listener will not call event.preventDefault(), which is useful for optimizing touch and wheel events.

<!-- The event listener is passive (does not prevent default) -->
<div @scroll.passive="onScroll">Scroll Me</div>

1.7 .dblclick

You can use this modifier to listen for the double-click event.

<button @click.dblclick="onDblClick">Double Click Me</button>

2. Input Modifiers

These modifiers are used to modify the behavior of form elements like <input>, <textarea>, and <select> when binding with v-model.
2.1 .lazy

By default, v-model updates the bound data on input events. The .lazy modifier updates the data only after the change event, not the input event.

<!-- Update value after losing focus or after pressing enter -->
<input v-model.lazy="message">

2.2 .number

This modifier attempts to automatically convert the input value to a number.

<!-- Automatically converts input to number -->
<input v-model.number="age" type="number">

2.3 .trim

This modifier automatically trims any whitespace from the input value.

<!-- Automatically trims spaces -->
<input v-model.trim="message" placeholder="No spaces around">

3. Modifiers for v-bind

The v-bind directive doesn't have its own set of specific modifiers, but you can still use standard Vue.js syntax like .sync for two-way binding between parent and child components.
3.1 .sync

This modifier is used to enable two-way binding for prop updates between parent and child components.

<!-- Parent Component -->
<child-component :value.sync="parentValue"></child-component>

<!-- Child Component -->
<template>
  <button @click="$emit('update:value', newValue)">Update</button>
</template>

4. Modifiers for v-model (Vue 3 specific)

Vue 3 added a few enhancements to the v-model directive, including the use of custom modifiers when working with multiple v-model bindings in the same component.
4.1 .modelValue

In Vue 3, you can use the .modelValue prop to handle multiple model bindings:

<!-- In Parent Component -->
<custom-input v-model:modelValue="value"></custom-input>

<!-- In Child Component -->
<template>
  <input v-model="localValue" />
</template>
<script>
export default {
  props: ['modelValue'],
  data() {
    return {
      localValue: this.modelValue
    };
  },
  watch: {
    localValue(newVal) {
      this.$emit('update:modelValue', newVal);
    }
  }
}
</script>

# 17.5. Custom Modifiers in Vue (With Custom Directives)

Vue allows you to create custom modifiers for your own custom directives. This is an advanced feature, and it's typically used for specific tasks that are not covered by Vue's built-in modifiers.
Example of a custom directive with a modifier:

```html
<script>
Vue.directive('focus', {
  bind(el, binding) {
    if (binding.modifiers.auto) {
      el.focus();
    }
  }
});
<script/>
<template>
{/* <!-- Will automatically focus the element --> */}
<input v-focus.auto>
</template>
```

## Summary of Common Modifiers

   # Event Modifiers:
        .prevent: Prevents the default behavior.
        .stop: Stops the event propagation.
        .capture: Listens during the capture phase.
        .self: Only triggers if the event target is the element itself.
        .once: Triggers the event only once.
        .passive: Prevents the use of event.preventDefault().
        .dblclick: Listens for a double-click.

  # Input Modifiers:
        .lazy: Updates only on the change event.
        .number: Converts the value to a number.
        .trim: Trims whitespace from the input.

  #  v-bind and v-model:
        .sync: Enables two-way binding for props.
        .modelValue: Used in Vue 3 for two-way binding with custom components.

These modifiers make Vue.js highly flexible, allowing you to easily handle common event-related tasks and input behaviors with minimal boilerplate code.

===================================================================================================================================================
## 18 COMPUTED PROPERTIES

# 18.1 What are Computed Properties?

Computed properties in Vue.js are special methods used to declare properties that are derived from other data in the Vue instance. Unlike regular methods, computed properties are cached based on their dependencies and will only re-evaluate when one of their dependencies changes.
Key Characteristics:

    1. Caching: Computed properties are cached based on their dependencies. If the data they depend on has not changed, they are not re-executed.
    2. Declarative: Computed properties are used to declaratively define logic based on reactive data.
    3. Getter and Setter: Computed properties can have both a getter (the value is returned) and a setter (used for updating the value).

EXAMPLE
```html
<template>
  <div>
    <input v-model="firstName" placeholder="Enter first name">
    <input v-model="lastName" placeholder="Enter last name">
    <p>Full Name: {{ fullName }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: ''
    };
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    }
  }
}
</script>
```

# When to Use Computed Properties

    1. Complex Data Transformation: When you need to perform complex calculations or transform data based on the state.
    2. Efficient Re-rendering: If the computation depends on reactive properties, Vue will only recalculate when those specific properties change.
    3. Avoiding Repetitive Logic: If the same logic is used in multiple places, computed properties can simplify the code by centralizing the logic.

# 18.2 Computed Properties with Getter and Setter

Computed properties can have both a getter and a setter, which is useful when you want to bind a property to both read and write operations.

```html
<template>
  <div>
    <input v-model="fullName" placeholder="Enter full name">
    <p>First Name: {{ firstName }}</p>
    <p>Last Name: {{ lastName }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: ''
    };
  },
  computed: {
    fullName: {
      // Getter
      get() {
        return this.firstName + ' ' + this.lastName;
      },
      // Setter
      set(newValue) {
        const names = newValue.split(' ');
        this.firstName = names[0] || '';
        this.lastName = names[1] || '';
      }
    }
  }
}
</script>
```

# When to Use Setter

    To allow two-way binding with input fields, as in the example where the user can modify the fullName field, and the underlying firstName and lastName are updated automatically.

# 18.3 Computed vs Methods
Computed Properties:

    Cached: Only re-evaluated when their dependencies change.
    Declarative: Used for properties that are dependent on other data.
    No parameters: Computed properties do not accept parameters and work on reactive data in the component.

Methods:

    Not Cached: Re-executed on each render.
    Imperative: Methods are functions that do not automatically update unless explicitly called.
    Can accept parameters: Methods are designed for actions that require input or more complex logic.

```vue
<template>
  <div>
    <p>Computed: {{ fullName }}</p>
    <p>Method: {{ getFullName() }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    };
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    }
  },
  methods: {
    getFullName() {
      return this.firstName + ' ' + this.lastName;
    }
  }
}
</script>
```
Differences:

    fullName (computed) will only re-evaluate when either firstName or lastName changes.
    getFullName (method) will be re-executed every time the component re-renders.

# 18.4 Computed Properties with Multiple Dependencies

Computed properties automatically update when any of their dependencies change, and Vue efficiently tracks those dependencies for you.

```vue
<template>
  <div>
    <input v-model="quantity" type="number" />
    <input v-model="price" type="number" />
    <p>Total: {{ totalPrice }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 0,
      price: 0
    };
  },
  computed: {
    totalPrice() {
      return this.quantity * this.price;
    }
  }
}
</script>
```

# 18.5 Computed Properties with Objects and Arrays

Computed properties can also return complex objects or arrays, not just simple values.

```vue
<template>
  <div>
    <p>{{ userInfo.name }}</p>
    <p>{{ userInfo.age }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      birthYear: 1990
    };
  },
  computed: {
    userInfo() {
      return {
        name: this.firstName + ' ' + this.lastName,
        age: new Date().getFullYear() - this.birthYear
      };
    }
  }
}
</script>
```


# Conclusion

    Computed properties are a powerful feature of Vue.js that allow you to compute derived state from reactive data efficiently.
    They offer automatic caching and reactivity, reducing unnecessary re-calculations and improving performance.
    Use them when you need to perform calculations or transformations based on data, especially if the result should be cached and automatically updated when dependencies change.

======================================================================================================================================================

## 19 What are Watchers?

In Vue.js, watchers allow you to observe and react to changes in data. They are useful when you need to perform asynchronous or expensive operations in response to changing data. While computed properties are ideal for derived state that needs to be cached, watchers are used for more complex side effects when data changes.

Key Characteristics:
    Reacting to Data Changes: Watchers track changes to specific data properties.
    Used for Side Effects: They are generally used to execute code in response to state changes (e.g., making HTTP requests, performing complex logic).
    Asynchronous Operations: Watchers are often used to trigger asynchronous tasks, such as API calls.

```js
watch: {
  // Watching a single property
  propName(newVal, oldVal) {
    // Code to run when 'propName' changes
  },

  // Watching multiple properties
  'dataProperty1': function (newVal, oldVal) {
    // Code to run when 'dataProperty1' changes
  },

  // Watching nested properties with deep option
  'nested.property': {
    handler(newVal, oldVal) {
      // Code to run when 'nested.property' changes
    },
    deep: true
  }
}
```
Explanation:

    propName: The data property to be watched.
    newVal and oldVal: newVal is the new value of the watched property, and oldVal is the previous value.
    deep: Used when you want to watch an object or array deeply, i.e., observe nested property changes.

# 19.1 Use Case: Performing an Async Operation

Watchers are commonly used for triggering actions like API calls when certain data changes.

```vue
<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />
    <p>Search Results for: {{ searchQuery }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  watch: {
    searchQuery(newQuery) {
      this.fetchSearchResults(newQuery);
    }
  },
  methods: {
    async fetchSearchResults(query) {
      if (query) {
        try {
          const response = await fetch(`https://api.example.com/search?q=${query}`);
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    }
  }
}
</script>
```

# 19.2 Watching Multiple Properties

You can also watch multiple properties in a single watcher.

```vue
<template>
  <div>
    <input v-model="firstName" placeholder="First Name" />
    <input v-model="lastName" placeholder="Last Name" />
    <p>Full Name: {{ fullName }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: ''
    };
  },
  watch: {
    firstName(newFirstName) {
      console.log('First name changed to:', newFirstName);
    },
    lastName(newLastName) {
      console.log('Last name changed to:', newLastName);
    }
  }
}
</script>
```

# 19.3 Deep Watching

By default, Vue only watches the immediate value of an object or array. If you want to watch changes in nested properties, you can set the deep option to true.

```vue
<template>
  <div>
    <button @click="changeName">Change Name</button>
    <p>{{ person.name }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      person: {
        name: 'John',
        age: 30
      }
    };
  },
  watch: {
    // Deep watch for nested 'name' property
    person: {
      handler(newPerson, oldPerson) {
        console.log('Person object changed:', newPerson);
      },
      deep: true
    }
  },
  methods: {
    changeName() {
      this.person.name = 'Jane';
    }
  }
}
</script>
```
Explanation:

    We deep-watch the person object.
    The watcher will trigger when any property of the person object, including name, changes.

# 19.4 Immediate Watchers

You can use the immediate option to trigger the watcher immediately when the component is mounted, in addition to when the watched property changes.

```js
watch: {
  count: {
    handler(newCount) {
      console.log(`Count changed: ${newCount}`);
    },
    immediate: true
  }
}
```
Explanation:

    The watcher will execute as soon as the component is created, and also every time the count property changes.

# 19.5 Watchers with Handler Functions

You can also define watchers using a function directly, instead of using an object with options.
```js
watch: {
  count(newCount, oldCount) {
    console.log(`Count changed from ${oldCount} to ${newCount}`);
  }
}
```
This is the simplest form of a watcher, where you specify the handler directly in the watch object.

# 19.6 Watchers in Vue 3 (Composition API)

In Vue 3, you can use the watch function from the Composition API for a more programmatic and flexible way to watch reactive data.

```vue
<template>
  <div>
    <input v-model="message" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  setup() {
    const message = ref('');

    // Watch the message reactive variable
    watch(message, (newMessage, oldMessage) => {
      console.log(`Message changed from "${oldMessage}" to "${newMessage}"`);
    });

    return {
      message
    };
  }
}
</script>
```
Explanation:

    In the Composition API, we use watch to watch the message ref.
    newMessage and oldMessage are the new and old values of the message.

# Use Cases for Watchers

    1. Performing Asynchronous Tasks: For example, making HTTP requests when a data property changes.
    2. Triggering Expensive Operations: Calculations or operations that should only run when certain data changes.
    3. Validating User Input: Reacting to changes in user input to validate or sanitize data.
    4. Synchronizing External States: Watching Vue data and synchronizing it with external libraries or global state management systems.

# Conclusion

    Watchers are powerful tools in Vue.js for observing and reacting to changes in data properties.
    Use watchers when you need to perform side effects, such as making asynchronous calls or triggering expensive operations based on changes in state.
    In Vue 3, the Composition API provides a more flexible and programmatic approach to using watchers.

=================================================================================================================================================
## 20 COMPONENTS

# 20.1 What are Components in Vue.js?

In Vue.js, components are reusable building blocks that allow you to break down the user interface into smaller, more manageable pieces. Each component encapsulates its own template, logic, and styling, making it easy to organize and maintain complex applications.
Key Characteristics of Components:

    Reusability: Components can be reused throughout the application.
    Encapsulation: Each component has its own scope, keeping concerns isolated (e.g., data, methods, styles).
    Composition: Components can be nested inside each other to create more complex UIs.
    Props and Events: Components communicate with each other through props (data passed down) and events (data passed up).

Component Types

    1. Local Components: Defined and used only within a specific component.
    2. Global Components: Available globally across the application after being registered globally.
    3. Functional Components: Stateless, functional components that do not have their own instance (e.g., no lifecycle hooks, no data).

Basic Syntax
# Component Definition

In Vue, a component is typically defined using an object with the following options:

    template: The HTML template for the component.
    data: The reactive data for the component.
    methods: The functions or actions related to the component.
    props: The external values passed to the component.
    computed: The derived state for the component.
    watch: Watching changes in data and reacting accordingly.

```js
// Component Definition (Object Syntax)
export default {
  name: 'MyComponent',
  props: ['title'],
  data() {
    return {
      message: 'Hello from MyComponent!'
    };
  },
  methods: {
    greet() {
      console.log(this.message);
    }
  }
}
```
Component Template Example
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button @click="greet">Click me</button>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: ['title'],
  data() {
    return {
      message: 'Hello from MyComponent!'
    };
  },
  methods: {
    greet() {
      console.log(this.message);
    }
  }
}
</script>

<style scoped>
/* Scoped styles for MyComponent */
div {
  padding: 10px;
  background-color: #f4f4f4;
}
</style>
```

Explanation:

    The MyComponent component displays a title (passed through props) and a message (from data).
    The greet method logs the message when the button is clicked.

# 20.2 Registering Components

There are two ways to register components in Vue: local registration and global registration.

# Local Component Registration

Local registration means the component is only available within the parent component where it is defined.

```vue
<!-- // Parent Component -->
<template>
  <div>
    <MyComponent title="Hello Vue!" />
  </div>
</template>

<script>
import MyComponent from './MyComponent.vue';

export default {
  components: {
    MyComponent // Registering the component locally
  }
}
</script>
```

# Global Component Registration

Global registration means the component is available throughout the entire application.
```js
// main.js or entry point
import Vue from 'vue';
import MyComponent from './components/MyComponent.vue';

Vue.component('MyComponent', MyComponent); // Registering the component globally
```
Once registered globally, you can use <MyComponent /> anywhere in your application.


# 20.3 Props: Passing Data to Components

Props allow a parent component to pass data down to a child component. Props are defined in the child component and can be accessed like normal data.

# Child component
```vue
<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    message: String // Define the type of the prop (optional but recommended)
  }
}
</script>
```

# Parent Component Example

```vue
<template>
  <div>
    <ChildComponent :message="parentMessage" />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
      parentMessage: 'Hello from the Parent!'
    };
  }
}
</script>
```
# Explanation:

    In the parent component, the parentMessage is passed down to the child via the message prop.
    The child component receives the prop and displays it.

# 20.4 Prop Validation (Optional but Recommended)

Vue allows you to define prop types to ensure that the right data type is passed to the component.
```js
props: {
  title: {
    type: String,
    required: true,
    default: 'Default Title'
  },
  age: {
    type: Number,
    default: 18
  }
}
```
    type: Specifies the expected type (e.g., String, Number).
    required: Specifies if the prop is mandatory.
    default: Specifies a default value if no prop is passed.

# 20.5 Emitting Events: Child to Parent Communication

In Vue, events allow child components to communicate with their parent components by emitting events.

# Emitting an Event from a Child Component

To send data from the child to the parent, you can use $emit to emit an event.
```vue
<template>
  <button @click="sendMessage">Send Message</button>
</template>

<script>
export default {
  methods: {
    sendMessage() {
      this.$emit('message-sent', 'Hello, Parent!');
    }
  }
}
</script>
```

# Parent Component Handling the Event

The parent listens for the event and reacts accordingly.
```vue
<template>
  <div>
    <ChildComponent @message-sent="handleMessage" />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  methods: {
    handleMessage(message) {
      console.log(message); // "Hello, Parent!"
    }
  }
}
</script>
```
Explanation:

    The child component emits an event named message-sent when the button is clicked.
    The parent component listens for the message-sent event and executes the handleMessage method when the event is received.

# 20.6 Dynamic Components

Vue allows you to dynamically render components using the <component> tag and v-bind:is directive. This is useful when you want to switch between components based on some condition.

```vue 
<template>
  <div>
    <button @click="currentComponent = 'ComponentA'">Load Component A</button>
    <button @click="currentComponent = 'ComponentB'">Load Component B</button>
    
    <component :is="currentComponent" />
  </div>
</template>

<script>
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';

export default {
  data() {
    return {
      currentComponent: 'ComponentA'
    };
  },
  components: {
    ComponentA,
    ComponentB
  }
}
</script>
```
Explanation:

    The <component :is="currentComponent" /> dynamically loads either ComponentA or ComponentB based on the value of currentComponent.
    Clicking the buttons updates currentComponent, which changes the displayed component.
  
# Scoped Slots

Scoped slots allow a child component to pass content back to its parent, but with access to specific data or methods within the child.

```vue
<template>
  <ChildComponent>
    <template v-slot:default="slotProps">
      <p>{{ slotProps.message }}</p>
    </template>
  </ChildComponent>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  }
}
</script>
```

In the child component, we define a scoped slot:

```vue
<template>
  <slot :message="message"></slot>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello from the child component!'
    };
  }
}
</script>
```
Explanation:

    The parent component binds to the default slot and uses the scoped data slotProps.message to display the value passed from the child.

# Conclusion

    Components in Vue.js are the building blocks of applications, promoting code reusability and modularity.
    You can pass props from parent to child components and use events to communicate back to the parent.
    Slots and scoped slots provide additional flexibility for customizing content in child components.
    Components can be registered locally or globally, and Vue supports dynamic components for conditional rendering.
    Vue's component system is one of the core features that makes it a powerful and scalable framework for building modern web applications.

=====================================================================================================================================================
## 21 PROPS TYPES AND PROPS VALIDATION

Prop Types and Validation in Vue.js

In Vue.js, props can be validated using a set of rules that define the expected type and behavior of the props. Here's a guide on how to use prop types and validation in Vue.

# 21.1. Basic Prop Validation

In Vue.js, you can define the type of a prop by using the type property in the props option.
```vue
<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true, // Prop is required
    },
  },
};
</script>
```

# 21.2. Type Validation

You can define more complex types for props, including String, Number, Boolean, Object, Array, Date, Function, Symbol, etc.

```vue
<template>
  <div>
    <p>{{ user.name }}</p>
    <p>{{ user.age }}</p>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
      validator(value) {
        // Custom validator to ensure the object has specific properties
        return value && typeof value.name === 'string' && typeof value.age === 'number';
      },
    },
  },
};
</script>
```

# 21.3. Default Values for Props

If a prop is not passed, you can specify a default value using the default property.

```vue
<template>
  <div>
    <p>{{ counter }}</p>
  </div>
</template>

<script>
export default {
  props: {
    counter: {
      type: Number,
      default: 0, // Default value if no value is provided
    },
  },
};
</script>
```
# 21.4. Custom Validator

You can also define a custom validator function for your props. This function is provided with the prop value and should return true if the validation passes or false/an error message if it fails.

```vue
<template>
  <div>
    <p>{{ rating }}</p>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true,
      validator(value) {
        if (value < 0 || value > 5) {
          return 'Rating must be between 0 and 5';
        }
        return true; // Return true if validation passes
      },
    },
  },
};
</script>
```
# 21.5. Multiple Types for Props

Sometimes, you might want to accept multiple types for a prop. Vue allows you to pass an array of types.

```vue
<template>
  <div>
    <p>{{ value }}</p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number], // Accepts either String or Number
      required: true,
    },
  },
};
</script>
```

# 21.6. Prop Validation in TypeScript

If you're using TypeScript with Vue, prop validation can be further enhanced with type annotations.

```ts
<template>
  <div>
    <p>{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>
```

# 21.7. Prop Validation with Arrays and Objects

Vue allows you to define arrays or objects as prop types. If you expect an array or object, you can specify the type more clearly.

ARRAYS
```vue
<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
```

OBJECTS
```vue
<template>
  <div>
    <p>{{ user.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
```

# Conclusion

Prop validation in Vue.js ensures that components receive the correct data types and helps improve code maintainability and debugging. By defining types, default values, and custom validators, you can create robust and reliable Vue components.

# Example: Complete Component
```vue
<template>
  <div>
    <p>{{ name }}</p>
    <p>{{ age }}</p>
    <p>{{ isActive }}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      validator(value) {
        if (value <= 0) {
          console.warn("Age must be a positive number.");
          return false;
        }
        return true;
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
```
=================================================================================================================================================

## 22 Non-Prop Validation in Vue.js

In Vue.js, non-prop validation refers to validation that happens on data, computed properties, or other reactive sources within a component, rather than the props passed into the component. While prop validation ensures that the correct data is passed down from a parent component, non-prop validation involves checking or ensuring that other internal component data meets certain conditions, constraints, or rules.

# 22.1. Non-Prop Validation in Vue.js

Vue provides flexibility when it comes to managing and validating internal state. You can validate data inside the component using computed properties, watchers, or methods, depending on the use case.

# 22.1.1. Validating Internal Data

You can use methods or computed properties to validate internal component state or form data.
Example: Internal Data Validation using Computed Properties

```vue
<template>
  <div>
    <input v-model="age" placeholder="Enter your age" />
    <p v-if="isAgeValid">Your age is valid!</p>
    <p v-else>Your age is invalid.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      age: '',
    };
  },
  computed: {
    isAgeValid() {
      // Validate that the age is a number and between 18 and 100
      const age = parseInt(this.age, 10);
      return !isNaN(age) && age >= 18 && age <= 100;
    }
  }
};
</script>
```
In this example:

    The isAgeValid computed property validates the age data by ensuring it's a number between 18 and 100.
    This non-prop validation does not involve props but validates the internal state of the component (age).

# 22.1.2. Validating User Input in Forms

When dealing with forms, it's common to validate fields before submitting them. You can use methods or computed properties to do so.
Example: Validating Form Input with Methods

```vue
<template>
  <div>
    <form @submit.prevent="submitForm">
      <input v-model="email" placeholder="Enter your email" />
      <button type="submit" :disabled="!isFormValid">Submit</button>
    </form>
    <p v-if="email && !isEmailValid">Invalid email format</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    };
  },
  computed: {
    isEmailValid() {
      // Simple email regex pattern for validation
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(this.email);
    },
    isFormValid() {
      return this.isEmailValid;
    }
  },
  methods: {
    submitForm() {
      if (this.isFormValid) {
        alert('Form submitted!');
      }
    }
  }
};
</script>
```

# 22.1.3. Validating with Watchers

You can also use watchers to monitor changes to data and perform validation when the data changes.
Example: Using Watchers for Validation

```vue
<template>
  <div>
    <input v-model="password" type="password" placeholder="Enter password" />
    <p v-if="passwordError">{{ passwordError }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      passwordError: ''
    };
  },
  watch: {
    password(newPassword) {
      this.validatePassword(newPassword);
    }
  },
  methods: {
    validatePassword(password) {
      // Basic password validation: at least 8 characters, 1 uppercase letter, and 1 number
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
      if (passwordPattern.test(password)) {
        this.passwordError = '';
      } else {
        this.passwordError = 'Password must be at least 8 characters long, contain 1 uppercase letter, and 1 number.';
      }
    }
  }
};
</script>
```

# 22.2. Non-Prop Validation in the Composition API

In the Composition API, validation can be done using ref, reactive, and computed properties, as well as watch functions. The setup function is the place where you would define and manage state, validation logic, and computed properties.

# 22.2.1. Validating Reactive Data in Composition API

The reactive function allows you to create a reactive object, and you can validate the fields within it using computed properties or methods.
Example: Validating Reactive Data with Computed Properties

```vue
<template>
  <div>
    <input v-model="email" placeholder="Enter your email" />
    <p v-if="isEmailValid">Your email is valid!</p>
    <p v-else>Your email is invalid.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const email = ref('');
const isEmailValid = computed(() => {
  // Simple email regex pattern for validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email.value);
});
</script>
```

# 22.2.2. Validating Data Changes with Watchers

You can also use the watch function in the Composition API to react to changes in reactive properties and validate them.
Example: Using Watchers for Non-Prop Validation

```vue
<template>
  <div>
    <input v-model="password" type="password" placeholder="Enter password" />
    <p v-if="passwordError">{{ passwordError }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const password = ref('');
const passwordError = ref('');

watch(password, (newPassword) => {
  validatePassword(newPassword);
});

function validatePassword(password) {
  // Basic password validation: at least 8 characters, 1 uppercase letter, and 1 number
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  if (passwordPattern.test(password)) {
    passwordError.value = '';
  } else {
    passwordError.value = 'Password must be at least 8 characters long, contain 1 uppercase letter, and 1 number.';
  }
}
</script>
```

# 22.3. Non-Prop Validation for Emitted Events

Sometimes, you may need to validate data that is emitted from a child component to the parent component. While emitting data itself does not involve validation directly, you can still ensure that the emitted values meet certain requirements before triggering actions in the parent.
Example: Emitting Validated Data

```vue
<template>
  <div>
    <input v-model="email" placeholder="Enter your email" />
    <button @click="submitEmail">Submit</button>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';

const emit = defineEmits();
const email = ref('');

function submitEmail() {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailPattern.test(email.value)) {
    emit('validEmail', email.value);
  } else {
    alert('Invalid email format');
  }
}
</script>
```

# Conclusion

Non-prop validation in Vue.js is crucial for validating internal state, user inputs, or any reactive data that does not come from the parent component via props. This can be achieved using:

    Computed properties for reactive data validation.
    Watchers to reactively validate data when it changes.
    Methods for validation logic triggered by user actions.
    Emitted events
