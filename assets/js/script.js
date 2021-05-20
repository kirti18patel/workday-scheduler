// getting current date
var currentDate = moment().format('dddd, MMMM Do');
var currentHour = moment().format('h A');
// updated current date in page
$("#currentDay").text(currentDate);

var timeAllDay = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
// var containerEl = document.querySelector(".container");
var displayAll = function(){
    for( var i=0; i<timeAllDay.length; i++)
    {   
        var rowEl = $("<div>")
        .addClass("row")
        .attr("id",i);

        var hourEl = $("<div>")
    .addClass("col-xl-2 hour p-3 text-right")
    .text(timeAllDay[i]);

    var statusEl = $("<div>")
    .addClass("col-xl-8 p-3")
    .text("");
    if(currentHour === timeAllDay[i]){
        statusEl.addClass("present");
    }
    else{
        statusEl.addClass("past");
    }

    var saveBtnEl = $("<div>")
    .addClass("col-xl-2 saveBtn p-3 text-center");
    saveBtnEl.append('<i class="fa fa-floppy-o"></i>');
    
    rowEl.append(hourEl,statusEl,saveBtnEl);

    $(".container").append(rowEl);}
};

displayAll();
$(".col-xl-8").on("click",function(){
    // get current text in task status box
    var taskText = $(this)
    .text()
    .trim();
    
    // create new input element
    var taskTextInput = $("<input>")
    .attr("type", "text")
    .addClass("col-xl-8 p-3 present")
    .val(taskText);
    $(this).replaceWith(taskTextInput);
    taskTextInput.trigger("focus");
});
$(".row").on("change", "input[type='text']", function() {
    // get  text and position in the list
    var taskTextFromInput = $(this).val();

    var index = $(this)
    .closest(".row")
    .index();
    // saveTask()

      // recreate span and insert in place of input element
    var statusEl = $("<div>")
    .addClass("col-xl-8 p-3 past")
    .text(taskTextFromInput);
    $(this).replaceWith(statusEl);
    
    // auditTask($(taskSpan).closest(".list-group-item"));
});