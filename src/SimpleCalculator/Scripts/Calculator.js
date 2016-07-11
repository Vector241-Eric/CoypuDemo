/// <reference path="~/Scripts/jquery-1.10.2.js" />

var CoypuDemo = CoypuDemo || {};
CoypuDemo.Calculator = (function() {

    var displayValue = "" + "0";
    var runningValue = 0;
    var currentOperation = "";
    var enteredOperation = false;
    var hasValue = false;

    var setDisplayValue = function(value) {
        displayValue = "" + value;
        document.getElementById("display-value").innerHTML = value;
    };

    var setDisplayOperation = function(text) {
        document.getElementById("display-operation").innerHTML = text;
    }

    var setOperation = function (text) {
        console.log("Current operation " + text);
        setDisplayOperation(text);
        currentOperation = text;
        enteredOperation = true;
    }

    var setCurrentValue = function(value) {
        console.log("Current value: " + value);
        runningValue = value;
    }

    var clearDisplay = function () {
        setDisplayValue(0);
        setDisplayOperation("");
    };

    var handleInput = function () {
        if (enteredOperation) {
            clearDisplay();
            enteredOperation = false;
        }

        var value = $(this).data("inputvalue");

        if (value === "." && displayValue.includes(".")) {
            return;
        }

        var newValue;

        if (displayValue === "0") {
            newValue = value;
        } else {
            newValue = "" + displayValue + value;
        }

        setDisplayValue(newValue);
    };

    var getValueFromDisplay = function(){
        var numberValue;
        if (displayValue.includes(".")) {
            numberValue = parseFloat(displayValue);
        } else {
            numberValue = parseInt(displayValue);
        }

        return numberValue;
    }

    var add = function(value) {
        
    }

    var completeCurrentOperation = function () {
        var currentDisplayedValue = getValueFromDisplay();
        if (currentOperation === "") {
            setCurrentValue(currentDisplayedValue);
        }
        if (currentOperation === "+") {
            var newValue = currentDisplayedValue + runningValue;
            setCurrentValue(newValue);
        }
    }

    //Operation Button Handlers

    var submitHandler = function() {
        completeCurrentOperation();
        setDisplayValue("" + runningValue);
    }

    var addHandler = function () {
        completeCurrentOperation();
        setOperation("+");
    }

    var subtractHandler = function (){}
    var multiplyHandler = function (){}
    var divideHandler = function (){}

    var clearHandler = function () {
        clearDisplay();
        runningValue = 0;
    }

    var clearEntryHandler = function() {
        clearDisplay();
    }

    var operationHandlerMap = {
        submit: submitHandler,
        add: addHandler,
        subtract: subtractHandler,
        multiply: multiplyHandler,
        divide: divideHandler,
        clear: clearHandler,
        clearentry: clearEntryHandler
    };

    var handleOperation = function() {
        var operation = $(this).data("operation");
        console.log(operation);
        operationHandlerMap[operation]();
    };

    var registerHandlers = function() {
        console.log("Registering button handlers.");
        $(".calculator-input").on("click", handleInput);
        $(".calculator-operation").on("click", handleOperation);
    };

    var initialize = function() {
        clearDisplay();
        registerHandlers();
    };
    return {
        initialize: initialize
    };
})();