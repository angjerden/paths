let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);
let node4 = new Node(4);
let node5 = new Node(5);
let node6 = new Node(6);
let node7 = new Node(7);
let node8 = new Node(8);
let node9 = new Node(9);
let node10 = new Node(10);
let node11 = new Node(11);
let node12 = new Node(12);
let node13 = new Node(13);
let node14 = new Node(14);
let node15 = new Node(15);
let node16 = new Node(16);
/*

13  14  15  16
9   10  11  12
5   6   7   8
1   2   3   4
*/

node1.setNeighbors([node2, node5]);
node2.setNeighbors([node1, node3, node6]);
node3.setNeighbors([node2, node4, node7]);
node4.setNeighbors([node3, node8]);
node5.setNeighbors([node1, node6, node9]);
node6.setNeighbors([node2, node5, node7, node10]);
node7.setNeighbors([node3, node6, node8, node11]);
node8.setNeighbors([node4, node7, node12]);
node9.setNeighbors([node5, node10, node13]);
node10.setNeighbors([node6, node9, node11, node14]);
node11.setNeighbors([node7, node10, node12, node15]);
node12.setNeighbors([node8, node11, node16]);
node13.setNeighbors([node9, node14]);
node14.setNeighbors([node10, node13, node15]);
node15.setNeighbors([node11, node14, node16]);
node16.setNeighbors([node12, node15]);

let Paths = {
    start: node1,
    finish: node16,
    path: [],
    numPaths: 0,
    search: function(node) {
        if (node.id === this.finish.id) {
            this.printPath();
            this.numPaths++;
            return;
        }

        node.neighbors.forEach(function(element, index) {
            if (this.path.indexOf(element) === -1) {
                this.path.push(element);
                this.search(element);
                this.path.pop();
            }
        }, this);
    },
    printPath: function() {
        let statement = '';
        this.path.forEach(function(element, index){
            statement += element.id + ', ';
        });
        statement = statement.trim().replace(/(^,)|(,$)/g, '');
        console.log(statement);
    }
};

Paths.path.push(Paths.start);
Paths.search(Paths.start);
console.log("The number of paths is " + Paths.numPaths);