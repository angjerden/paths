"use strict";

class Node {
    constructor(id) {
        this.id = id;
        this.neighbors = [];
    }

    setNeighbors(neighbors) {
        this.neighbors = neighbors;
    }

    toString() {
        return this.id;
    }
}
