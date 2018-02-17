class Node {
  constructor({ value }) {
    this.value = value;
    this.next = null;
  }
}

class List {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
    this.length = 0;
  }

  add(value) {
    const node = new Node({ value });
    if (!this.head) {
      this.head = node;
      this.current = this.head;
    }

    if (!this.tail) {
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.current = node;
    this.length += 1;
  }

  next() {
    const nextNode = this.current.next;

    if (nextNode === null) {
      this.current = this.head;
      return this.head.value;
    }

    this.current = nextNode;
    return nextNode.value;
  }

  get(index) {
    let node;
    let count = 0;
    
    while (count < index) {
      node = node.next;
      count += 1;
    }

    this.currentNode = node;
    return node;
  }

  lastAccessed() {
    return this.current.value;
  }

  first() {
    return this.head.value;
  }

  last() {
    return this.tail.value;
  }
}

export { Node, List };