// getting current date
var currentDate = moment().format('dddd, MMMM Do');
// updated current date in page
$("#currentDay").text(currentDate);

var statusEl;
var timeAllDay = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

// save data in localstorage
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// load data from localstorage
var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(element => $("#"+element.id)
    .text(element.task));
};

// display all available business ime slot when page loaded
var displayAll = function(){
    for( var i=0; i<timeAllDay.length; i++)
    {   
        // create each row
        var rowEl = $("<div>")
        .addClass("row");

        // create hourEl
        var hourEl = $("<div>")
    .addClass("col-xl-2 hour p-3 text-right")
    .text(timeAllDay[i]);

    // create statusEl
    statusEl = $("<div>")
    .addClass("col-xl-8 p-3")
    .text("")
    .attr("id",i);

    // set background color of statusEl depends on time
    if((i+9) == moment().hours()){
        statusEl.addClass("present");
    }
    else if((i+9)>moment().hours()){
        statusEl.addClass("future");
    }
    else{
        statusEl.addClass("past");
    }

    // create save button for each row
    var saveBtnEl = $("<div>")
    .addClass("col-xl-2 saveBtn p-3 text-center");
    saveBtnEl.append('<i class="fa fa-floppy-o"></i>');
    
    rowEl.append(hourEl,statusEl,saveBtnEl);

    $(".container").append(rowEl);}
};

displayAll();
loadTasks();

// convert div element to input when user clicked on it
var handleTaskClick = function(){
    // get current text in task status box
    var taskText = $(this)
    .text()
    .trim();
    // create new input element
    var taskTextInput = $("<input>")
    .attr("type", "text")
    .addClass($(this).attr("class"))
    .text(taskText)
    .val(taskText);

    // call itself when clicked on it
    taskTextInput.on("click", handleTaskClick);
    $(this).replaceWith(taskTextInput);
    taskTextInput.trigger("focus");
};

// click event listener
$(".col-xl-8").on("click", handleTaskClick);

// update data entered by user
var displayChangedData = function(){
    $(".row").on("change", "input[type='text']", function() {
    // get  text and position in the list
    var taskTextFromInput = $(this).val();
    var index = $(this)
    .closest(".row")
    .index();
    if(index>(-1)){
        tasks.push({"id":index, "task":taskTextFromInput, "time":moment().format('h A')});
        saveTasks();
    }

    // recreate span and insert in place of input element
    var statusEl = $("<div>")
    .addClass($(this).attr("class"))
    .text(taskTextFromInput);

    // event listener for statusEl when get clicked
    statusEl.on("click", handleTaskClick);
    $(this).replaceWith(statusEl);
});
}

// event listener to save data when save button get clicked
$(".saveBtn").on("click", displayChangedData);