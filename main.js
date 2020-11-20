window.addEventListener("load", () => {
  setup()
  var time = 20;
  var inter = setInterval(update, time*1000)
});

var max = 8;

var min_vare = 5;
var max_vare = 20;

var penge = 50000

var wood = {low:100, high:120, name:"Træ"};
var staal = {low:500, high:1000, name:"Stål"};
var aluminium = {low:200, high:400, name:"Aluminium"}
var plastic = {low:10, high:20, name:"Plastik"};

var vare = [wood,staal,aluminium,plastic]

var storage = {Træ:0, Stål:0, Aluminium:0, Plastik:0}

function getRan(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function setup() {
  document.getElementById("penge").innerHTML = penge;
  for (var i = 0; i < max; i++) {
    thing = vare[Math.floor(Math.random() * vare.length)];

    parent = document.getElementById("import")
    container = document.createElement("div")
    container.classList.add("container")

    type_name = document.createElement("p")
    type_name.innerHTML = thing.name;

    price = document.createElement("input")
    price.type = "number";
    price.setAttribute('value', getRan(thing.low, thing.high));
    price.classList.add("number")
    price.readOnly = "true"

    amount = document.createElement("input")
    amount.type = "number";
    amount.setAttribute("value", getRan(min_vare, max_vare))
    amount.classList.add("number")
    amount.readOnly = "true";

    button = document.createElement("input")
    button.type = "button"
    button.setAttribute("value", "Køb")
    button.classList.add("button")
    button.addEventListener("click", function() {buy(this.parentElement)})

    container.append(type_name)
    container.append(price)
    container.append(amount)
    container.append(button)
    parent.append(container)
  }
  for (var i = 0; i < max; i++) {
    thing = vare[Math.floor(Math.random() * vare.length)];

    parent = document.getElementById("export")
    container = document.createElement("div")
    container.classList.add("container")

    type_name = document.createElement("p")
    type_name.innerHTML = thing.name;

    price = document.createElement("input")
    price.type = "number";
    price.setAttribute('value', getRan(thing.low, thing.high));
    price.classList.add("number")
    price.readOnly = "true"

    amount = document.createElement("input")
    amount.type = "number";
    amount.setAttribute("value", getRan(min_vare, max_vare))
    amount.classList.add("number")
    amount.readOnly = "true";

    button = document.createElement("input")
    button.type = "button"
    button.setAttribute("value", "Sælg")
    button.classList.add("button")
    button.addEventListener("click", function() {sell(this.parentElement)})

    container.append(type_name)
    container.append(price)
    container.append(amount)
    container.append(button)
    parent.append(container)
  }
}

function buy(thing) {
  price = Number(thing.children[1].value)
  amount = Number(thing.children[2].value)
  if (price*amount <= penge) {
    penge -= price*amount
    document.getElementById("penge").innerHTML = penge
    add_to_storage(thing.children[0].innerHTML, thing.children[2].value)
    thing.remove()
    genNew_import()
  }
}

function add_to_storage(type, amount) {
  storage[type] += Number(amount);

  if (storage[type]-amount == 0){

    parent = document.getElementById("storage")
    container = document.createElement("div")
    container.classList.add("storage_container")
    container.id = type + "_c";

    total = document.createElement("p")
    total.innerHTML = storage[type]
    total.id = type;

    text = document.createElement("p")
    text.innerHTML = type

    container.append(text)
    container.append(total)
    parent.append(container)
  } else {
    var current = document.getElementById(type)
    current.innerHTML = storage[type]
  }
}

function genNew_import() {
  thing = vare[Math.floor(Math.random() * vare.length)];

  parent = document.getElementById("import")
  container = document.createElement("div")
  container.classList.add("container")

  type_name = document.createElement("p")
  type_name.innerHTML = thing.name;

  price = document.createElement("input")
  price.type = "number";
  price.setAttribute('value', getRan(thing.low, thing.high));
  price.classList.add("number")
  price.readOnly = "true"

  amount = document.createElement("input")
  amount.type = "number";
  amount.setAttribute("value", getRan(min_vare, max_vare))
  amount.classList.add("number")
  amount.readOnly = "true";

  button = document.createElement("input")
  button.type = "button"
  button.setAttribute("value", "Køb")
  button.classList.add("button")
  button.addEventListener("click", function() {buy(this.parentElement)})

  container.append(type_name)
  container.append(price)
  container.append(amount)
  container.append(button)
  parent.append(container)
}

function genNew_export() {
  thing = vare[Math.floor(Math.random() * vare.length)];

  parent = document.getElementById("export")
  container = document.createElement("div")
  container.classList.add("container")

  type_name = document.createElement("p")
  type_name.innerHTML = thing.name;

  price = document.createElement("input")
  price.type = "number";
  price.setAttribute('value', getRan(thing.low, thing.high));
  price.classList.add("number")
  price.readOnly = "true"

  amount = document.createElement("input")
  amount.type = "number";
  amount.setAttribute("value", getRan(min_vare, max_vare))
  amount.classList.add("number")
  amount.readOnly = "true";

  button = document.createElement("input")
  button.type = "button"
  button.setAttribute("value", "Sælg")
  button.classList.add("button")
  button.addEventListener("click", function() {sell(this.parentElement)})

  container.append(type_name)
  container.append(price)
  container.append(amount)
  container.append(button)
  parent.append(container)
}

function sell(thing) {
  price = Number(thing.children[1].value)
  amount = Number(thing.children[2].value)
  type = thing.children[0].innerHTML

  if (storage[type] >= amount) {
    penge += price*amount
    document.getElementById("penge").innerHTML = penge
    storage[type] -= amount;
    document.getElementById(type).innerHTML = storage[type]
    thing.remove()
    genNew_export()
    if (storage[type] == 0) {
      document.getElementById(type + "_c").remove()
    }
  }
}

function update() {
  var items = document.getElementsByClassName("container");
  while (items[0]){
    items[0].remove()
  }
  setup()
}
