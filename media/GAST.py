from abc import ABCMeta, abstractmethod

class GAST:
    __metaclass__ = ABCMeta

    @abstractmethod
    def str_node(self, node, tag):
        pass
 
    @abstractmethod
    def ast_visit(self, node, pnode=None, level=0):
        pass

    @abstractmethod
    def getRoot(self):
        pass
