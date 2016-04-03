let Paths = {
    rows: 3,
    cols: 3,
    nodes: [],
    start: undefined,
    finish: undefined,
    path: [],
    numPaths: 0,
    startSearch: function() {
        this.generateNodes();
        this.path.push(Paths.start);
        this.search(Paths.start);
        console.log("The number of paths is " + Paths.numPaths);
    },
    search: function(node) {
        if (node.id === this.finish.id) {
            this.printPath();
            Draw.drawPath(this.rows, this.cols, this.path);
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
    },
    generateNodes: function() {
        let nodecounter = 0;

        //generating nodes
        for (let i = 0; i < this.rows; i++) {
            this.nodes.push([]);
            for (let j = 0; j < this.cols; j++) {
                this.nodes[i][j] = new Node(nodecounter);
                nodecounter++;
            }
        }

        //setting neighbors
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let neighbors = [];
                if (i > 0) {
                    neighbors.push(this.nodes[i-1][j]);
                }
                if (j > 0) {
                    neighbors.push(this.nodes[i][j-1]);
                }
                if (j < (this.cols - 1)) {
                    neighbors.push(this.nodes[i][j+1]);
                }
                if (i < this.rows - 1) {
                    neighbors.push(this.nodes[i+1][j]);
                }

                //finally, set neighbors
                this.nodes[i][j].setNeighbors(neighbors);
            }
        }

        //setting start and finish
        this.start = this.nodes[0][0];
        this.finish = this.nodes[this.rows-1][this.cols-1];
    }
};
