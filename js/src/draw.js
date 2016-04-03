let Draw = {
    rectX: 0,
    rectY: 0,
    rectSize: 50,
    drawEdgesMode: "round",
    lineWidth: 20,
    bgColor: "#D3D9DB",
    blockColor: "#B2B6B8",
    pathColor: "#F0F2F2",
    numCanvases: 0,
    numCanvasRows: 0,
    canvasesPerRow: 3,
    drawGrid: function(rows, cols, cx) {
        rows--; //number of blocks will be one less than number of nodes
        cols--;

        //rounded corners
        cx.lineJoin = this.drawEdgesMode;
        cx.lineWidth = this.lineWidth;

        let size = this.calculateCanvasSize(rows, cols);

        //set grid background style
        cx.fillStyle = this.bgColor;
        cx.strokeStyle = this.bgColor;

        // draw grid background
        cx.strokeRect(this.rectX+(this.lineWidth/2),
            this.rectY+(this.lineWidth/2),
            size.width-this.lineWidth,
            size.height-this.lineWidth);
        cx.fillRect(this.rectX+(this.lineWidth/2),
            this.rectY+(this.lineWidth/2),
            size.width-this.lineWidth,
            size.height-this.lineWidth);

        //set grid blocks style
        cx.fillStyle = this.blockColor;
        cx.strokeStyle = this.blockColor;

        //draw grid blocks
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let offsetX = this.lineWidth * (j + 1) + (this.rectSize * j);
                let offsetY = this.lineWidth * (i + 1) + (this.rectSize * i);
                cx.strokeRect(this.rectX+(this.lineWidth/2) + offsetX,
                    this.rectY+(this.lineWidth/2) + offsetY,
                    this.rectSize-(this.lineWidth),
                    this.rectSize-(this.lineWidth));
                cx.fillRect(this.rectX+(this.lineWidth/2) + offsetX,
                    this.rectY+(this.lineWidth/2) + offsetY,
                    this.rectSize-(this.lineWidth),
                    this.rectSize-(this.lineWidth));
            }
        }
    },
    calculateCanvasSize: function(rows, cols){
        //calculating background height
        let bgHeight = this.rectSize * rows
            + (this.lineWidth * rows)
            + this.lineWidth;
        let bgWidth = this.rectSize * cols
            + (this.lineWidth * cols)
            + this.lineWidth;

        return {height: bgHeight, width: bgWidth}
    },
    appendCanvas: function(rows, cols) {
        this.numCanvases++;
        let canvasId = "canvas" + this.numCanvases;
        let size = this.calculateCanvasSize(rows, cols);
        let canvasTd = "<td><canvas id='"
            + canvasId
            + "' width='" + size.width
            + "' height='" + size.height
            + "'></canvas></td>";
        let rowId = "row" + this.numCanvasRows;
        if ((this.numCanvases - 1) % 3 === 0 || this.numCanvases === 1) {
            this.numCanvasRows++;
            rowId = "row" + this.numCanvasRows;

            jQuery("#canvasTable")
                .append(
                    "<tr id='" + rowId +"'></tr>");
        }

        jQuery("#" + rowId + "")
            .append(canvasTd);

        return canvasId;
    },
    drawPath: function(rows, cols, path) {
        let canvasName = this.appendCanvas(rows, cols);
        let canvas = jQuery("#" + canvasName)[0];
        let cx = canvas.getContext("2d");

        this.drawGrid(rows, cols, cx);

        //rounded corners
        cx.lineCap = this.drawEdgesMode;

        cx.fillStyle = this.pathColor;
        cx.strokeStyle = this.pathColor;

        cx.beginPath();

        for (let i = 0; i < path.length - 1; i++) {
            let start = path[i];
            let stop = path[i+1];

            let startRow = Math.floor(start.id / cols);
            let startCol = start.id % cols;

            let stopRow = Math.floor(stop.id / cols);
            let stopCol = stop.id % cols;

            let startX = this.lineWidth/2 + this.rectSize * startCol + (this.lineWidth)*startCol;
            let startY = this.lineWidth/2 + this.rectSize * startRow + (this.lineWidth)*startRow;
            let stopX = this.lineWidth/2 + this.rectSize * stopCol + (this.lineWidth)*stopCol;
            let stopY = this.lineWidth/2 + this.rectSize * stopRow + (this.lineWidth)*stopRow;

            cx.moveTo(startX, startY);
            cx.lineTo(stopX, stopY);

            cx.stroke();
        }
    }
};