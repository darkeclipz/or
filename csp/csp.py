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