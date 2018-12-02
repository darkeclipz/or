class Graph {

    constructor(V) {
        this.V = V;
        this.E = 0;
        this.adj = new Array(V);
        for(let i=0; i < this.adj.length; i++)
            this.adj[i] = [];
        console.log(this.adj);
    }

    addEdge(v, w) {
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.E++;
    }

    hasEdge(v, w) {
        return this.adj[v].indexOf(w) >= 0;
    }

    adjacent(v) {
        return this.adj[v];
    }

}

class EdgeWeightedGraph {

    constructor(V) {
        this.V = V;
        this.E = 0;
        this.adj = new Array(V);
        for(let i=0; i < this.adj.length; i++)
            this.adj[i] = [];
        console.log(this.adj);
    }

    addEdge(e) {
        let v = e.either(), w = e.other(v);
        this.adj[v].push(e);
        this.adj[w].push(e);
        this.E++;
    }

    hasEdge(v, w) {
        for(let e of this.adjacent(v))
            if(e.either() == w || e.other(e.either()) == w)
                return true;
        return false;
    }

    adjacent(v) {
        return this.adj[v];
    }

    edges() {
        let result = [];
        for(let v=0; v < this.V; v++)
        for(let e of this.adjacent(v))
            if(e.other(v) > v)
                result.push(e);
        return result;
    }

}

class Edge {
    constructor(v,w,weight){
        this.v=v;
        this.w=w;
        this.weight=weight;
    }

    either() {
        return this.v;
    }

    other(v) {
        if(v == this.v) return this.w;
        else if(v == this.w) return this.v;
        else console.error('Vertex is not in this edge.');
    }

    compareTo(e) {
        if(this.weight < e.weight) return -1;
        else if(this.weight > e.weight) return 1;
        return 0;
    }
}