/// <reference path="~/Scripts/jquery-1.10.2.js" />

var CoypuDemo = CoypuDemo || {};
CoypuDemo.Calculator = (function() {

    var displayValue = "" + "0";
    var leftOperand = 0, hasStoredLeftOperand = false;
    var rightOperand = 0, hasStoredRightOperand = false;
    var currentOperation = "";
    var clearDisplayOnNextInput = false;
    var clearValuesOnNextInput = false;
    var submitted = false;

    var clearRightOperand = function () {
        hasStoredRightOperand = false;
    }

    var setRightOperand = function (value) {
        rightOperand = value;
        hasStoredRightOperand = true;
    }

    var clearLeftOperand = function () {
        hasStoredLeftOperand = false;
    }

    var setLeftOperand = function (value) {
        leftOperand = value;
        hasStoredLeftOperand = true;
    }

    var setDisplayValue = function (value) {
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
        clearDisplayOnNextInput = true;
    };
    var setCurrentValue = function(value) {
        console.log("Current value: " + value);
        leftOperand = value;
    };
    var clearDisplay = function() {
        setDisplayValue(0);
        setDisplayOperation("");
        clearDisplayOnNextInput = false;
    };

    var clearEverything = function () {
        clearDisplay();
        leftOperand = 0;
        rightOperand = 0;
        hasStoredRightOperand = false;
        currentOperation = "";
        clearDisplayOnNextInput = false;
        clearValuesOnNextInput = false;
    }

    var handleInput = function () {
        if (clearValuesOnNextInput) {
            clearEverything();
        }
        if (clearDisplayOnNextInput) {
            clearDisplay();
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
        var left, right, newValue;
        if (!hasStoredLeftOperand) {
            left = getValueFromDisplay();
            setLeftOperand(left);
            return;
        }
        left = leftOperand;

        if (hasStoredRightOperand) {
            right = rightOperand;
        } else {
            right = getValueFromDisplay();
        }

        console.log(left + " " + currentOperation + " " + right);

        if (currentOperation === "") {
            setCurrentValue(right);
            return;
        }

        if (currentOperation === "+") {
            newValue = left + right;
            setCurrentValue(newValue);
            return;
        }

        if (currentOperation === "-") {
            newValue = left - right;
            setCurrentValue(newValue);
        }
    };

    //Operation Button Handlers

    var submitHandler = function () {
        submitted = true;
        //Make sure we aren't repeatedly pressing =
        if (!hasStoredRightOperand) {
            setRightOperand(getValueFromDisplay());
            hasStoredRightOperand = true;
        }

        completeCurrentOperation();
        setDisplayValue("" + leftOperand);
        clearDisplayOnNextInput = true;
        clearValuesOnNextInput = true;
    };

    var handleMathOperation = function (operationText) {
        clearRightOperand();
        if (submitted) {
            clearLeftOperand();
            submitted = false;
        }
        completeCurrentOperation();
        setOperation(operationText);

        //If we push +,-,/,or X after =, then keep the current running value.
        clearValuesOnNextInput = false;
    }

    var addHandler = function() {
        handleMathOperation("+");
    };

    var subtractHandler = function() {
        handleMathOperation("-");
    };
    var multiplyHandler = function() {};
    var divideHandler = function () { };

    var clearHandler = function () {
        clearEverything();
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
        clearHandler();
        registerHandlers();
    };
    return {
        initialize: initialize
    };
})();