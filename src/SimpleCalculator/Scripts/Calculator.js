/// <reference path="~/Scripts/jquery-1.10.2.js" />

var CoypuDemo = CoypuDemo || {};
CoypuDemo.Calculator = (function() {

    var displayValue = "" + "0";
    var leftOperand = 0;
    var storedRightOperand = 0;
    var hasStoredRightOperand = false;
    var currentOperation = "";
    var enteredOperation = false;
    var hasValue = false;

    var setDisplayValue = function(value) {
        displayValue = "" + value;
        document.getElementById("display-value").innerHTML = value;
    };

    var setDisplayOperation = function(text) {
        document.getElementById("display-operation").innerHTML = text;
    };
    var setOperation = function(text) {
        console.log("Current operation " + text);
        setDisplayOperation(text);
        currentOperation = text;
        enteredOperation = true;
    };
    var setCurrentValue = function(value) {
        console.log("Current value: " + value);
        leftOperand = value;
    };
    var clearDisplay = function() {
        setDisplayValue(0);
        setDisplayOperation("");
    };

    var handleInput = function() {
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

    var getValueFromDisplay = function() {
        var numberValue;
        if (displayValue.includes(".")) {
            numberValue = parseFloat(displayValue);
        } else {
            numberValue = parseInt(displayValue);
        }

        return numberValue;
    };
    var completeCurrentOperation = function() {
        var left, right;
        if (hasStoredRightOperand) {
            right = storedRightOperand;
        } else {
            right = getValueFromDisplay();
        }
        left = leftOperand;

        console.log(left + " " + currentOperation + " " + right);

        if (currentOperation === "") {
            setCurrentValue(right);
        }
        if (currentOperation === "+") {
            var newValue = left + right;
            setCurrentValue(newValue);
        }
    };

    //Operation Button Handlers

    var submitHandler = function () {
        if (!hasStoredRightOperand) {
            storedRightOperand = getValueFromDisplay();
            hasStoredRightOperand = true;
        }

        completeCurrentOperation();
        setDisplayValue("" + leftOperand);
    };
    var addHandler = function() {
        completeCurrentOperation();
        setOperation("+");
    };
    var subtractHandler = function() {};
    var multiplyHandler = function() {};
    var divideHandler = function() {};
    var clearHandler = function() {
        clearDisplay();
        leftOperand = 0;
    };
    var clearEntryHandler = function() {
        clearDisplay();
    };
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