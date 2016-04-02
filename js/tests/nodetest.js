import Node from '../src/node.js';

describe('Create a Node class', () => {
    it('with standard values', () => {
        let nodeId = 1;
        let node = new Node(nodeId);
        expect(node.id).to.equal(nodeId);
    });

});