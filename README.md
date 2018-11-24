# Algorithms from Operations Research

## Constraint satisfaction problems (CSP)

The following is a small Python implementation of a CSP solver:

```python
import copy

class Variable():
    def __init__(self, name, D): 
        self.name = name; 
        self.domain = D; 
        self.value = D[0]
    def __eq__(self, v): return v.name == self.name
    def __repr__(self): return '{}={}'.format(self.name, self.value, self.domain)
        
class Constraint():
    def __init__(self, expr): self.expression = expr
    def __repr__(self): return self.expression
    def eval(self, V): return eval(self.replace_all(self.expression, {v.name:v.value for v in V}))
    def replace_all(self, text, dic):
        for k, v in dic.items():
            text = text.replace(k, str(v))
        return text
    
class CSP():
    def __init__(self, variables, constraints):
        self.variables = variables
        self.constraints = constraints
        self.stop_on_first = False
        
    def solve(self):
        self.solution = []
        self.gt_solve([], self.variables)
        return self.solution[::-1]
    
    def gt_solve(self, S, V):
        if len(V) == 0: return all([c.eval(S) for c in self.constraints])           
        v = V.pop()
        S.append(v)
        for d in v.domain:
            if self.solution and self.stop_on_first: return
            v.value = d
            if self.gt_solve(copy.deepcopy(S), copy.deepcopy(V)):
                self.solution.append(S)
        return False
```

It is able to solve the map coloring problem, as defined below:

```python
%%time
colors = {'red': 0, 'blue': 1, 'green': 2}
V = [Variable(x, list(colors.values())) for x in 'SA,WA,NT,Q,NSW,V'.split(',')]
c1 = Constraint('SA!=WA')
c2 = Constraint('SA!=NT')
c3 = Constraint('SA!=Q')
c4 = Constraint('SA!=NSW')
c5 = Constraint('SA!=V')
c6 = Constraint('WA!=NT')
c7 = Constraint('NT!=Q')
c8 = Constraint('Q!=NSW')
c9 = Constraint('NSW!=V')
C = [c1,c2,c3,c4,c5,c6,c7,c8,c9]
csp = CSP(V,C)
csp.solve()

```

All the possible solutions for the model are:

```python
print('There are {} solutions:'.format(len(csp.solution)))
lkup = {v:k for k,v in colors.items()}
print([[{v.name:lkup[v.value]} for v in s] for s in csp.solution])
```

```
There are 6 solutions:
[[{'V': 'red'}, {'NSW': 'blue'}, {'Q': 'red'}, {'NT': 'blue'}, {'WA': 'red'}, {'SA': 'green'}], [{'V': 'red'}, {'NSW': 'green'}, {'Q': 'red'}, {'NT': 'green'}, {'WA': 'red'}, {'SA': 'green'}], [{'V': 'blue'}, {'NSW': 'red'}, {'Q': 'blue'}, {'NT': 'red'}, {'WA': 'blue'}, {'SA': 'green'}], [{'V': 'blue'}, {'NSW': 'green'}, {'Q': 'blue'}, {'NT': 'green'}, {'WA': 'blue'}, {'SA': 'green'}], [{'V': 'green'}, {'NSW': 'red'}, {'Q': 'green'}, {'NT': 'red'}, {'WA': 'green'}, {'SA': 'green'}], [{'V': 'green'}, {'NSW': 'blue'}, {'Q': 'green'}, {'NT': 'blue'}, {'WA': 'green'}, {'SA': 'green'}]]
Wall time: 210 ms
```