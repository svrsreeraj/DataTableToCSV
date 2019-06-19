
function exportDataTableToCsv(dataTable) {
    var self = this;

    this.getVisibleColoumns = function() {
        var allColumns = dataTable.columns().visible();
        var visibleColumns = [];
        for (var i = 0; i < allColumns.length; i++) {
            allColumns[i] && visibleColumns.push(i); 
        }
        return visibleColumns;
    }

    this.getHeaderTextArray = function(columnArr) {
        var headerTextArr = [];
        for (var i = 0; i < columnArr.length; i++) {
            headerTextArr.push(dataTable.column(columnArr[i]).header().innerText);
        }
        return headerTextArr;
    }

    this.getRowsLength= function() {
        return dataTable.data().length;
    }

    this.getCSVString= function() {
        var resultArr = [];
        var visibleColumns = self.getVisibleColoumns();
        var rowsLength = self.getRowsLength();
        if(!visibleColumns.length) {
            return;
        }
        var csvString = "";
        var headerTextArr = self.getHeaderTextArray(visibleColumns);
        headerTextArr = headerTextArr.map(this._formatString);
        resultArr.push(headerTextArr)
        // csvString += headerTextArr.join(",");
        // csvString += "\n";
        for (let iRow = 0; iRow < rowsLength; iRow++) {
            var tempArr = [];
            console.log("row - " + iRow);
            for (let iCol = 0; iCol < visibleColumns.length; iCol++) {
                const column = visibleColumns[iCol];
                //csvString += self._formatString(dataTable.column(column).data()[iRow]) + ",";
                tempArr.push(self._formatString(dataTable.column(column).data()[iRow]))
            }
            resultArr.push(tempArr)
            //csvString += "\n";
        }
        return resultArr;
    }

    this._formatString= function(dataString) {
        dataString = dataString.toString().replace(/"/g, '""');
        return dataString.search(/("|,|\n)/g) >= 0 ? '"' + dataString + '"' : dataString;
    }
    
    var csvString = self.getCSVString();

}
