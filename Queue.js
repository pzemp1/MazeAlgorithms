function Queue() {
    this.Elements = [];
};

Queue.prototype.enqueue = function(e) {
    console.log("pushed");
    this.Elements.push(e);
}

Queue.prototype.dequeue = function() {
    return this.Elements.shift();
}

Queue.prototype.isEmpty = function() {
    return this.Elements.length == 0;
}
