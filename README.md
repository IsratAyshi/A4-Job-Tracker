
## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
- While getElementById selects/gets one single element by it's unique HTML id  , getElementsByClass gets elements by class and returns live array like HTMLCollection . On the other hand, querySelector and querySelectorAll allows selection with flexible combination of CSS selector (basic selectors and combinators). While, querySelector selects the first matching element with the CSS selector and returns only one element, the querySelectorAll selects all matching elements with the CSS selector and returns a static nodeList.

### 2. How do you create and insert a new element into the DOM?
-  i. Create a new element (example: 'div' element) -->
            document.createElement('div')
  ii. Add classes, content, innerHTML, anything that's needed
 iii. Insert it into parent element using appendChild(), apprend() etc methods.

### 3. What is Event Bubbling? And how does it work?
- Event Bubbling is a process where an event triggered on a child elements automatically propagates upward through its parent elements and travels till reaches the root in the DOM hiararchy, unless propagation is stopped. Event bubbling is enabled by default and allows some handler on a parent element to listen for events on it's nested children which reduces memory usage.

### 4. What is Event Delegation in JavaScript? Why is it useful?
-  Event Delegation is a method to attach a single event listener to a parent element istead of adding same event to multiple children separately. This listener can then handle events for all descendants and find out which chind element is the origin of that event using event.target.

It is useful because it reduces the redundent number of event listener, improves performance, optimizes code efficiency and automatically works if elements are dynamically added.

### 5. What is the difference between preventDefault() and stopPropagation() methods?
-  preventDefault() stops the browser's default action for any event. On the other hand, stopPropagation() stops an event from further capturing and bubbling upwards or downwards in the DOM hiararchy tree.