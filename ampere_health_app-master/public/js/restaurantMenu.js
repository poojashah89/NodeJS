$( document ).ready(function() {

$.ajax({
    url: '/menu',
    type: "get",
    dataType: "json",
   
    success: function(data, textStatus, jqXHR) {
        // since we are using jQuery, you don't need to parse response
        drawTable(data);
    }
});


});

function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}

function drawRow(rowData) {
    var row = $("<tr />")
    $("#menu123").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.restaurant + "</td>"));
    row.append($("<td>" + rowData.items + "</td>"));
    row.append($("<td>" + rowData.calories + "</td>"));
}